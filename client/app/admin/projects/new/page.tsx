import ProjectDisplay from "@/app/components/ProjectDisplay";
import { projectData } from "@/app/projects/[id]/mockData";
import NewProject from "../../_components/NewProject";
import NewProjectForm from "../../_components/NewProjectForm";

const adminProjectPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <h1>New Projectpage</h1>
      <NewProjectForm />
      {/* <div className="flex flex-row">
        <div className="flex-1 overflow-auto max-h-[calc(100vh-2rem)] p-5">
          <ProjectDisplay project={projectData} showCloseButton={false} />
        </div>
        <div className="flex-1">
          <NewProject />
        </div>
      </div> */}
    </div>
  );
};

export default adminProjectPage;
