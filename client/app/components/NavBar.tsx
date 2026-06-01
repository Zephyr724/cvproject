"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Admin", href: "/admin" },
    { name: "Sign in", href: "/api/auth/signin" },
  ];

  return (
    <div className="w-full h-10 bg-blue-300 flex items-center gap-x-3 p-3 font-bold">
      {navLinks?.map((link) => {
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded transition-colors ${
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

export default NavBar;
