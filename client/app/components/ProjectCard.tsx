"use client";
import { Box, Card, Inset, Text, Strong, Flex, Badge } from "@radix-ui/themes";
import { Project } from "../projects/_components/types";
import ProjectLink from "./ProjectLink";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  return (
    <div>
      <Box maxWidth="480px" maxHeight="720px">
        <div
          onClick={() => router.push(`/projects/${project.id}`)}
          className="block cursor-pointer transition-shadow hover:shadow-md rounded-(--radius-4)"
        >
          <Card size="3">
            <Flex direction="column" gap="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src={
                    project.sections[0]?.contentImages?.[0]?.url ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt="Bold typography"
                  style={{
                    display: "block",
                    objectFit: "cover",
                    width: "100%",
                    height: 360,
                    backgroundColor: "var(--gray-5)",
                  }}
                />
              </Inset>
              <Text as="p" size="4" weight="bold" truncate>
                {project.title}
              </Text>
              <Text
                as="p"
                size="3"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 10, // Text line limit
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                <Strong>Typography</Strong> is the art and technique of
                arranging type to make written language legible, readable and
                appealing when displayed.is the art and technique of arranging
                type to make written language legible, readable and appealing
                when displayed.is the art and technique of arranging type to
                make written language legible, readable and appealing when
                displayed.
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
