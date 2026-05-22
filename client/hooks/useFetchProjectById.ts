import { useEffect, useState } from "react";
import { Project } from "@/app/projects/_components/types";
import projectService from "@/lib/api/project-api-service";
import { CanceledError } from "@/lib/api/api-client";

const useFetchProjectById = (projectId: number | undefined) => {
  const [project, setProject] = useState<Project>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId === undefined) return;

    setLoading(true);
    const { request, cancel } = projectService.getById<Project>(projectId);
    request
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => cancel();
  }, [projectId]);

  return { project, setProject, error, setError, isLoading };
};

export default useFetchProjectById;
