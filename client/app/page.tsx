import { getServerSession } from "next-auth";
import { authOptioins } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptioins);

  return (
    <div className="w-full">
      <main>
        <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      </main>
    </div>
  );
}
