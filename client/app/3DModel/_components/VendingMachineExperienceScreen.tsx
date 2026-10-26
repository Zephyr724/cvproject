import { useState } from "react";
import dayjs from "dayjs";
import { Container, Text } from "@react-three/uikit";
import { ArrowUpRightIcon } from "@react-three/uikit-lucide";
import type { Experience } from "@/app/admin/experience/types";
import type { VendingScreenLayout } from "../_hooks/useVendingScreen";

interface Props {
  screenLayout: VendingScreenLayout;
  experiences: Experience[];
}

export default function VendingMachineExperienceScreen({
  screenLayout,
  experiences,
}: Props) {
  // Store only the selected id so the state stays valid when experience objects
  // are recreated. The newest experience is expanded on the first render.
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    experiences[0]?.id ?? null,
  );

  return (
    <group
      position={screenLayout.position}
      quaternion={screenLayout.quaternion}
    >
      <Container
        // The root uses the measured GLB screen size in world units. pixelSize
        // converts the 240-unit UI design width into the matching world scale.
        sizeX={screenLayout.width}
        sizeY={screenLayout.height}
        pixelSize={screenLayout.width / 240}
        anchorX="center"
        anchorY="center"
        backgroundColor="#171717"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="flex-start"
        paddingX={20}
        paddingY={18}
        onClick={(event) => event.stopPropagation()}
      >
        <Text
          alignSelf="flex-start"
          color="#ffffff"
          fontSize={15}
          lineHeight={1}
          marginBottom={12}
        >
          WORK EXPERIENCES
        </Text>

        {experiences.map((experience, index) => {
          const isSelected = experience.id === selectedExperience;

          return (
            <Container
              key={experience.id}
              width="100%"
              // Keep each row at its intended height instead of allowing Yoga
              // to compress it when the selected experience changes.
              flexShrink={0}
              flexDirection="column"
            >
              {isSelected ? (
                <Container
                  width="100%"
                  flexDirection="column"
                  alignItems="center"
                  paddingY={10}
                  backgroundColor="#171717"
                >
                  {/* Only an experience without an end date is currently active. */}
                  {!experience.endDate && (
                    <Container
                      alignSelf="flex-start"
                      marginBottom={10}
                      paddingX={14}
                      paddingY={6}
                      borderRadius={12}
                      backgroundColor="#ffffff"
                    >
                      <Text
                        color="#171717"
                        fontSize={10}
                        lineHeight={1}
                        fontWeight="bold"
                      >
                        CURRENT
                      </Text>
                    </Container>
                  )}
                  <Text
                    color="#ffffff"
                    fontSize={38}
                    lineHeight={1}
                    fontWeight="semi-bold"
                  >
                    {experience.title}
                  </Text>

                  <Container
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                    marginTop={8}
                  >
                    <Text
                      color="#dddddd"
                      alignSelf="center"
                      fontSize={18}
                      lineHeight={1.2}
                      fontWeight="semi-bold"
                    >
                      {experience.company}
                    </Text>

                    <Text
                      color="#aaaaaa"
                      alignSelf="center"
                      fontSize={14}
                      lineHeight={1.2}
                      fontWeight="light"
                    >
                      {formatExperienceDate(experience.startDate)}
                      {" - "}
                      {formatExperienceDate(experience.endDate)}
                    </Text>
                  </Container>
                  <Container
                    width="100%"
                    height={32}
                    alignSelf="center"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    marginTop={10}
                    paddingX={14}
                    borderRadius={5}
                    backgroundColor="#ffffff"
                    cursor="pointer"
                    hover={{ backgroundColor: "#dddddd" }}
                    active={{ backgroundColor: "#bbbbbb" }}
                    onClick={(event) => {
                      event.stopPropagation();
                      // handleViewRole();
                    }}
                  >
                    <Text
                      color="#171717"
                      fontSize={15}
                      lineHeight={1}
                      fontWeight="bold"
                    >
                      VIEW ROLE {">"}
                    </Text>
                  </Container>
                </Container>
              ) : (
                <Container
                  // Collapsed rows can grow when a long title wraps, while the
                  // minimum height keeps spacing consistent for short titles.
                  width="100%"
                  minHeight={60}
                  flexShrink={0}
                  flexDirection="row"
                  alignItems="center"
                  gap={10}
                  paddingY={6}
                  cursor="pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    // Exactly one experience is expanded at a time.
                    setSelectedExperience(experience.id);
                  }}
                >
                  <Text
                    width={18}
                    flexShrink={0}
                    color="#888888"
                    fontSize={15}
                    lineHeight={1}
                    fontWeight="semi-bold"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Text>

                  <Text
                    flexGrow={1}
                    flexShrink={1}
                    color="#ffffff"
                    fontSize={18}
                    lineHeight={1}
                    fontWeight="semi-bold"
                  >
                    {experience.title}
                  </Text>

                  <ArrowUpRightIcon
                    width={14}
                    height={14}
                    flexShrink={0}
                    marginLeft="auto"
                    color="#ffffff"
                  />
                </Container>
              )}

              {index < experiences.length - 1 && (
                <Container
                  alignSelf="center"
                  width="100%"
                  height={2}
                  backgroundColor="#555555"
                  marginTop={5}
                />
              )}
            </Container>
          );
        })}
      </Container>
    </group>
  );
}

function formatExperienceDate(date?: string | null): string {
  return date ? dayjs(date).format("MMM YYYY") : "Present";
}
