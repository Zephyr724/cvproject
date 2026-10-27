import { useState } from "react";
import dayjs from "dayjs";
import { Container, Text } from "@react-three/uikit";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@react-three/uikit-lucide";
import type { Experience } from "@/app/admin/experience/types";
import type { VendingScreenLayout } from "../_hooks/useVendingScreen";

interface Props {
  screenLayout: VendingScreenLayout;
  experiences: Experience[];
  openExperiencePage: (experienceId: number) => void;
}

export default function VendingMachineExperienceScreen({
  screenLayout,
  experiences,
  openExperiencePage,
}: Props) {
  // Store only the selected id so the state stays valid when experience objects
  // are recreated. The newest experience is expanded on the first render.
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    experiences[0]?.id ?? null,
  );

  const VISIBLE_COUNT = 3;

  // Find the position of the currently selected experience.
  const selectedIndex = Math.max(
    experiences.findIndex((experience) => experience.id === selectedExperience),
    0,
  );

  // Show the selected experience followed by the next two experiences.
  const visibleExperiences = experiences.slice(
    selectedIndex,
    selectedIndex + VISIBLE_COUNT,
  );

  const hasPrevious = selectedIndex > 0;

  const selectPrevious = () => {
    if (!hasPrevious) return;

    const previousExperience = experiences[selectedIndex - 1];
    setSelectedExperience(previousExperience.id);
  };

  const hasNext = selectedIndex < experiences.length - 1;

  const selectNext = () => {
    if (!hasNext) return;

    const nextExperience = experiences[selectedIndex + 1];
    setSelectedExperience(nextExperience.id);
  };

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
        {hasPrevious && (
          <Container
            width="100%"
            height={13}
            flexShrink={0}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={3}
            borderRadius={4}
            backgroundColor="#ffffff"
            cursor="pointer"
            onClick={(event) => {
              event.stopPropagation();
              selectPrevious();
            }}
          >
            <ChevronUpIcon width={10} height={10} color="#171717" />
            <Text
              color="#171717"
              fontSize={10}
              lineHeight={1}
              fontWeight="bold"
            >
              PREVIOUS
            </Text>
          </Container>
        )}
        {visibleExperiences.map((experience, index) => {
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
                      openExperiencePage(experience.id);
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
                    {String(selectedIndex + index + 1).padStart(2, "0")}
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
              {index < visibleExperiences.length - 1 && (
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
        <Container
          width="100%"
          height={13}
          flexShrink={0}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={3}
          borderRadius={4}
          backgroundColor={hasNext ? "#ffffff" : "#333333"}
          cursor={hasNext ? "pointer" : undefined}
          onClick={(event) => {
            event.stopPropagation();
            selectNext();
          }}
        >
          <Text
            color={hasNext ? "#171717" : "#777777"}
            fontSize={10}
            lineHeight={1}
            fontWeight="bold"
          >
            NEXT
          </Text>
          <ChevronDownIcon
            width={10}
            height={10}
            color={hasNext ? "#171717" : "#777777"}
          />
        </Container>
      </Container>
    </group>
  );
}

function formatExperienceDate(date?: string | null): string {
  return date ? dayjs(date).format("MMM YYYY") : "Present";
}
