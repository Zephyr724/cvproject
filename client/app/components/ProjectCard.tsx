"use client";
import { Box, Card, Inset, Text, Strong, Flex, Badge } from "@radix-ui/themes";
import { Project } from "../projects/_components/types";
import ProjectLink from "./ProjectLink";
import { useRouter } from "next/navigation";

interface Props {
  project: Pick<
    Project,
    | "id"
    | "title"
    | "introduction"
    | "coverImageUrl"
    | "projectUrl"
    | "githubUrl"
    | "tags"
  >;
}

export const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Box maxWidth="480px" maxHeight="720px">
        <div
          onClick={() => router.push(`/projects/${project.id}`)}
          className="block cursor-pointer transition-shadow overflow-hidden  hover:shadow-md rounded-(--radius-4)"
        >
          <Card size="3">
            <Flex direction="column" gap="0">
              <Inset clip="padding-box" side="top" pb="0">
                <img
                  src={
                    project.coverImageUrl ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 280,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="4" weight="bold" truncate mt="3">
                {project.title}
              </Text>
              <Text
                as="p"
                size="3"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 8, // Text line limit
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
                my="2"
              >
                {project.introduction}
              </Text>
              <Flex gap="1" wrap="wrap">
                {project.tags?.map((tag) => (
                  <Badge key={tag.name} color="gray">
                    {tag.name}
                  </Badge>
                ))}
              </Flex>
              <div
                className="flex justify-start"
                onClick={(e) => e.stopPropagation()}
              >
                <ProjectLink
                  projectUrl={project.projectUrl}
                  githubUrl={project.githubUrl}
                />
              </div>
            </Flex>
          </Card>
        </div>
      </Box>
    </div>
  );
};

export default ProjectCard;
