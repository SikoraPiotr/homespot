type AdminFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
};

export function AdminField({
  id,
  label,
  value,
  onChange,
  multiline = false,
  rows = 4,
  hint,
}: AdminFieldProps) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          className="field__control field__control--area"
          id={id}
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="field__control"
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {hint ? <p className="admin__hint">{hint}</p> : null}
    </div>
  );
}
