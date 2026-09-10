"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";


export const NavBar = () => {
  // useSession reports whether authentication is loading, signed in, or signed out.
  const { data: session, status } = useSession();
  // The current path is used below to highlight the matching navigation link.
  const pathname = usePathname();

  const searchParams = useSearchParams();
  // The Projects page can be opened normally or inside the 3D scene's iframe.
  // Embedded mode hides this bar so two navigation bars are not shown at once.
  const isEmbedded = searchParams.get("embed") === "1";

  const navLinks = [
    { name: "Homepage", href: "/" },
    { name: "3D", href: "/3DModel" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Admin", href: "/admin" },
    { name: "Sign in", href: "/api/auth/signin" },
  ];

  if (isEmbedded) return null;

  return (
    <div className="w-full h-10 bg-blue-300 flex items-center gap-x-3 p-3 font-bold">
      {navLinks?.map((link) => {
        // Homepage must match exactly. Other links stay active on nested routes,
        // such as /projects/123 or /admin/experience.
        const isActive =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

        // Avoid briefly showing "Sign in" while the existing session is loading.
        if (status === "loading" && link.name === "Sign in")
          return <div key={link.href}>Loading...</div>;

        if (status === "authenticated" && link.name === "Sign in") {
          // Once signed in, reuse the final nav slot for the user name and sign-out link.
          return (
            <div key={link.href}>
              {session.user!.name}
              <Link href="api/auth/signout" className="ml-3">
                Sign Out
              </Link>
            </div>
          );
        }

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
