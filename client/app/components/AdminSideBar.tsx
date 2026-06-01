"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminSideBar = () => {
  const pathname = usePathname();

  const navLinks = [{ name: "Projects", href: "/admin/projects" }];

  return (
    <div className="flex flex-col bg-blue-200 h-screen">
      {navLinks?.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 transition-colors ${
              isActive
                ? "bg-blue-600 text-white font-bold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSideBar;
