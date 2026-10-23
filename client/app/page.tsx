// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome to CVProject</h1>

      <p>Create and share your interactive portfolio.</p>

      <Link href="/tiffani-ho" className="btn btn-primary">
        View Example Portfolio
      </Link>
    </main>
  );
}
