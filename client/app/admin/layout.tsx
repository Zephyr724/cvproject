import type { ReactNode } from "react";
import AdminSideBar from "../components/AdminSideBar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayoutPage = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex h-screen">
      <aside className="w-[10%]">
        <AdminSideBar />
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayoutPage;
