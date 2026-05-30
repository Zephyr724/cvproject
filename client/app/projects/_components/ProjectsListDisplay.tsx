"use client";

import { Project } from "@/app/projects/_components/types";
import { Button, Link, Table } from "@radix-ui/themes";
import { useState } from "react";
import projectApiService from "@/lib/api/project-api-service";
import { useRouter } from "next/navigation";

interface Props {
  projects: Project[];
}

const ProjectsListDisplay = ({ projects }: Props) => {
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / PAGE_SIZE);

  const startIndex = page * PAGE_SIZE;

  const endIndex = startIndex + PAGE_SIZE;

  const router = useRouter();

  const handleDelete = async (projectId: number) => {
    await projectApiService.delete(projectId);
    router.refresh();
  };

  return (
    <div className="flex flex-col">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Project ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Project Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Operations</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {projects?.slice(startIndex, endIndex).map((project) => (
            <Table.Row key={project.id}>
              <Table.RowHeaderCell>{project.id}</Table.RowHeaderCell>
              <Table.Cell>{project.title}</Table.Cell>
              <Table.Cell className="flex gap-2 items-center">
                <Button asChild>
                  <Link href={`/admin/projects/${project.id}/edit`}>
                    Update
                  </Link>
                </Button>

                <Button color="red" onClick={() => handleDelete(project.id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <label>
        Page {page + 1} / {totalPages}
      </label>
      <div>
        <Button
          disabled={page === 0}
          onClick={() => {
            setPage((p) => p - 1);
          }}
        >
          Previous Page
        </Button>
        <Button
          disabled={page >= totalPages - 1}
          onClick={() => {
            setPage((p) => p + 1);
          }}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default ProjectsListDisplay;
