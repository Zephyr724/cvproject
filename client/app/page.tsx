import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <main>
        <Link href="/project">Project</Link>
      </main>
    </div>
  );
}
