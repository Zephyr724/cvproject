import ProjectDisplay from "@/app/components/ProjectDisplay";
import { projectData } from "@/app/projects/[id]/mockData";

const page = () => {
  return (
    <>
      <h1>New Projectpage</h1>
      <div className="flex flex-row">
        <div className="flex-1 overflow-auto max-h-[calc(100vh-2rem)] p-5">
          <ProjectDisplay project={projectData} showCloseButton={false} />
        </div>
        <div className="flex-1">Edit area</div>
      </div>
    </>
  );
};

export default page;
