import Link from "next/link";
import { projectData } from "./mockData";
import CloseButton from "@/app/components/CloseButton";
import { FaGithub } from "react-icons/fa";

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
    responsibilities,
    implementations,
  } = await projectData;

  return (
    <div className="flex flex-col items-center">
      <header className="grid grid-cols-[1fr_auto_1fr] w-full p-4">
        {/* div: just a placeholder for grid columns = 3*/}
        <div></div>
        <div className="flex flex-col items-center gap-1">
          <h1>{title}</h1>
          <div className="flex">
            {tags.map((tag) => (
              <div key={tag.id}>{tag.name}</div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 p-1 justify-end text-xs flex-wrap">
          {/* right coner */}
          <Link href={projectUrl} className="underline">
            Website
          </Link>
          <Link href={githubUrl} className="underline">
            <FaGithub />
          </Link>
          <CloseButton />
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
