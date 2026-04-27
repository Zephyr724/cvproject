import Link from "next/link";
import { projectData } from "./mockData";
import CloseButton from "@/app/components/CloseButton";
import { FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";
import TechStack from "../TechStack";
import Responsibilities from "../Responsibilities";
import Sections from "../_components/Sections";

interface Props {
  searchParams: Promise<{ id: string }>;
}

const ProjectPage = async ({ searchParams }: Props) => {
  const { id } = await searchParams;

  //mock data
  const {
    projectID,
    title,
    tags,
    projectUrl,
    githubUrl,
    techStack,
    responsibilities,
    sections,
  } = await projectData;

  return (
    <div className="flex flex-col mx-auto items-center max-w-4xl border-solid border border-gray-300 p-1 relative ">
      <div className="absolute -top-4 -right-4">
        <CloseButton />
      </div>
      <header className="grid grid-cols-[1fr_auto_1fr] w-full px-4 py-2">
        {/* div: just a placeholder for grid columns = 3*/}
        <div></div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl mt-1 mb-1">{title}</h1>
          <div className="flex flex-wrap gap-2 m-1 text-xs text-white">
            {tags.map((tag) => (
              <div
                className=" bg-gray-400 rounded-2xl px-2 py-0.3  min-w-10 whitespace-nowrap text-center"
                key={tag.id}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1.5 p-1 justify-end text-xs  underline">
          {/* right coner */}
          <Link href={projectUrl}>
            <FaExternalLinkSquareAlt className="size-4" />
          </Link>
          <Link href={githubUrl}>
            <FaGithub className="size-4" />
          </Link>
        </div>
      </header>

      <main className="w-full px-4 flex flex-col  gap-y-2">
        {techStack &&
          (techStack.frontend.length || techStack.backend.length) > 0 && (
            <div>
              <TechStack techStack={techStack} />
            </div>
          )}
        {responsibilities && responsibilities.length > 0 && (
          <Responsibilities responsibilities={responsibilities} />
        )}

        {sections && sections.length > 0 && <Sections sections={sections} />}
      </main>
    </div>
  );
};

export default ProjectPage;
