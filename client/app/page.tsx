import Image from "next/image";
import ProjectPage from "./projects/page";

export default function Home() {
  return (
    <div className="w-full">
      <main>
        <ProjectPage />
      </main>
    </div>
  );
}
