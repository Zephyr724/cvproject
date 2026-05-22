import NewProjectForm from "@/app/admin/_components/NewProjectForm";

const page = () => {
  return (
    <div className="h-screen flex flex-col">
      <h1>New Projectpage</h1>
      <NewProjectForm projectId={1} />
    </div>
  );
};

export default page;
