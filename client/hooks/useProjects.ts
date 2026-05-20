import { useEffect, useState } from "react";
import { Project } from "@/app/projects/_components/types";
import projectService from "@/lib/api/project-api-service";
import { CanceledError } from "@/lib/api/api-client";

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = projectService.getAll<Project>();
    request
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => cancel();
  }, []);

  return { projects, setProjects, error, setError, isLoading };
};

export default useProjects;
