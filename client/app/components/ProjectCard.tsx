import { Box, Card, Inset, Text, Strong, Flex, Badge } from "@radix-ui/themes";
import { Project } from "../projects/_components/types";

interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <div>
      <Box maxWidth="480px" maxHeight="720px">
        <Card size="3">
          <Flex direction="column" gap="3">
            <Inset clip="padding-box" side="top" pb="current">
              <img
                src={
                  project.sections[0]?.contentImages?.[0]?.url ??
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
              <Strong>Typography</Strong> is the art and technique of arranging
              type to make written language legible, readable and appealing when
              displayed.is the art and technique of arranging type to make
              written language legible, readable and appealing when displayed.is
              the art and technique of arranging type to make written language
              legible, readable and appealing when displayed.
            </Text>
            <Flex gap="1" wrap="wrap">
              {project.tags?.map((tag) => (
                <Badge key={tag.name} color="gray">
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          </Flex>
        </Card>
      </Box>
    </div>
  );
};

export default ProjectCard;
