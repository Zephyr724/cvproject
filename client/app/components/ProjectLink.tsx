import Link from "next/link";
import { FaExternalLinkSquareAlt, FaGithub } from "react-icons/fa";

interface Props {
  projectUrl: string | null;
  githubUrl: string | null;
}

export const ProjectLink = ({ projectUrl, githubUrl }: Props) => {
  return (
    <div className="flex gap-2">
      {projectUrl && (
        <Link href={projectUrl}>
          <FaExternalLinkSquareAlt className="size-6" />
        </Link>
      )}
      {githubUrl && (
        <Link href={githubUrl}>
          <FaGithub className="size-6" />
        </Link>
      )}
    </div>
  );
};

export default ProjectLink;
