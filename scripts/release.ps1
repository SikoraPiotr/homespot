# Buduje nazwane wydanie i wgrywa DOKŁADNIE tę paczkę na FTP.
# Nie używa starego folderu homespot-do-wgrania i nie kasuje zdjęć spoza paczki.
# Przed startem musi istnieć releases/<Version>/RELEASE-NOTES.md
param(
  [Parameter(Mandatory = $true)]
  [string]$Version
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$releaseDir = Join-Path $root "releases\$Version"
$notesPath = Join-Path $releaseDir "RELEASE-NOTES.md"
$siteDir = Join-Path $releaseDir "site"
$stash = Join-Path $env:TEMP "homespot-export-stash"

if ($Version -notmatch "^[a-z0-9][a-z0-9.-]+$") {
  throw "Wersja ma mieć postać 2026-11-25-uwagi-2"
}
if (-not (Test-Path $notesPath)) {
  throw "Brak $notesPath. Najpierw opisz, co wchodzi w to wydanie."
}

$sha = (git -C $root rev-parse --short HEAD).Trim()
$builtAt = Get-Date -Format "yyyy-MM-dd HH:mm"

Push-Location $root
try {
  if (Test-Path $stash) { Remove-Item -Recurse -Force $stash }
  New-Item -ItemType Directory -Path $stash | Out-Null
  Move-Item -LiteralPath (Join-Path $root "src\app\api") -Destination (Join-Path $stash "api")
  Move-Item -LiteralPath (Join-Path $root "src\app\admin") -Destination (Join-Path $stash "admin")
  $env:STATIC_EXPORT = "1"
  npx next build
  if ($LASTEXITCODE -ne 0) { throw "Build nie przeszedł." }
}
finally {
  if ((Test-Path (Join-Path $stash "api")) -and -not (Test-Path (Join-Path $root "src\app\api"))) {
    Move-Item -LiteralPath (Join-Path $stash "api") -Destination (Join-Path $root "src\app\api")
  }
  if ((Test-Path (Join-Path $stash "admin")) -and -not (Test-Path (Join-Path $root "src\app\admin"))) {
    Move-Item -LiteralPath (Join-Path $stash "admin") -Destination (Join-Path $root "src\app\admin")
  }
  Remove-Item -Recurse -Force $stash -ErrorAction SilentlyContinue
  Remove-Item Env:STATIC_EXPORT -ErrorAction SilentlyContinue
  Pop-Location
}

if (Test-Path $siteDir) { Remove-Item -Recurse -Force $siteDir }
New-Item -ItemType Directory -Path $siteDir | Out-Null
robocopy (Join-Path $root "out") $siteDir /E /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null
if ($LASTEXITCODE -ge 8) { throw "Kopiowanie paczki nie wyszło." }
$global:LASTEXITCODE = 0
Copy-Item (Join-Path $root "scripts\homespot.htaccess") (Join-Path $siteDir ".htaccess") -Force

$manifest = Join-Path $releaseDir "MANIFEST.txt"
$files = Get-ChildItem $siteDir -Recurse -File
@(
  "version=$Version"
  "git=$sha"
  "built=$builtAt"
  "files=$($files.Count)"
) | Set-Content -Path $manifest -Encoding utf8

Set-Content -Path (Join-Path $root "releases\LATEST") -Value $Version -Encoding utf8

$winscp = "C:\Program Files (x86)\WinSCP\WinSCP.com"
$ini = "C:\Users\Piotrecki\Documents\WinSCP.ini"
if (-not (Test-Path $winscp)) { throw "Nie ma WinSCP.com. Paczka leży w $siteDir i nie została wgrana." }
if (-not (Test-Path $ini)) { throw "Nie ma sesji WinSCP. Paczka leży w $siteDir i nie została wgrana." }

$uploadScript = Join-Path $env:TEMP "homespot-release-upload.txt"
@"
option batch abort
option confirm off
open "work@pscoders.pl@s170.cyber-folks.pl"
lcd "$siteDir"
cd /public_html/homespot
put *
exit
"@ | Set-Content -Path $uploadScript -Encoding ascii

& $winscp /ini="$ini" /script="$uploadScript"
if ($LASTEXITCODE -ne 0) { throw "Wgranie wydania $Version nie doszło do końca. Paczka została w $siteDir." }

Write-Host "Wydanie $Version jest na serwerze. Notatka: $notesPath"
