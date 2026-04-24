import Link from "next/link";
import React from "react";

const ProjectPage = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="grid grid-cols-[1fr_auto_1fr] w-full p-4">
        {/* div: just a placeholder for grid columns = 3*/}
        <div></div>
        <div className="flex flex-col items-center gap-1">
          <h1>Title</h1>
          <div className="flex">
            <h2>Subtitle</h2>
            <h2>Subtitle</h2>
            <h2>Subtitle</h2>
          </div>
        </div>

        <div className="flex gap-0 p-1 justify-end text-xs flex-wrap">
          {/* right coner */}
          <Link href={""}>Project Page</Link>
          <Link href={""}>Github page</Link>
          <div>Close BTN</div>
        </div>
      </header>

      <main className="">
        <div>Tech Stack</div>
        <div>Responsibilities</div>
        <div>Implementation</div>
      </main>
    </div>
  );
};

export default ProjectPage;
