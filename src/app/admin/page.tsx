import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import { getSiteContent } from "@/lib/content";
import { AdminEditor } from "@/components/organisms/AdminEditor/AdminEditor";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();

  return (
    <main className="admin">
      <AdminEditor initialContent={content} />
    </main>
  );
}
