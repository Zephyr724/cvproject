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
  // Position, rotation, and dimensions measured from the vending-machine screen
  // mesh. These values keep the UIKit panel aligned with the GLB geometry.
  screenLayout: VendingScreenLayout;

  // Experiences are normally supplied by the route after they are loaded from
  // the application data source.
  experiences: Experience[];

  // Opens the full experience page for the selected role.
  openExperiencePage: (experienceId: number) => void;
}

export default function VendingMachineExperienceScreen({
  screenLayout,
  experiences,
  openExperiencePage,
}: Props) {
  // Store the id instead of the complete object. Object instances may be
  // recreated after a fetch or render, while a database id remains stable.
  // The first experience is expanded when the component is first mounted.
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    experiences[0]?.id ?? null,
  );

  // Zero-based index of the first experience in the current three-item window.
  // For example, 0 displays items 1-3 and 1 displays items 2-4.
  const [pageStartIndex, setPageStartIndex] = useState(0);

  // The vending-machine display has enough vertical space for three roles.
  const VISIBLE_COUNT = 3;

  // Convert the selected id back into its index in the complete array. This
  // global index is used to determine whether the selected item remains visible
  // after the sliding window moves. Fall back to zero if the id no longer exists.
  const selectedIndex = Math.max(
    experiences.findIndex((experience) => experience.id === selectedExperience),
    0,
  );

  // Create the current sliding window without changing the original array.
  // Moving pageStartIndex by one produces 1-3 -> 2-4 -> 3-5 pagination.
  const visibleExperiences = experiences.slice(
    pageStartIndex,
    pageStartIndex + VISIBLE_COUNT,
  );

  // A previous window exists whenever the current window does not start at 0.
  const hasPrevious = pageStartIndex > 0;

  // A next window exists only when at least one item remains after the current
  // three visible items.
  const hasNext = pageStartIndex + VISIBLE_COUNT < experiences.length;

  // Move the sliding window one item toward the beginning of the array.
  const selectPrevious = () => {
    // The guard also protects this function if it is called while the button is
    // hidden or disabled.
    if (!hasPrevious) return;

    const previousStartIndex = pageStartIndex - 1;

    // Clamp the exclusive end index because the final window may contain fewer
    // than VISIBLE_COUNT items.
    const previousEndIndex = Math.min(
      previousStartIndex + VISIBLE_COUNT,
      experiences.length,
    );

    setPageStartIndex(previousStartIndex);

    // Preserve the expanded role when it is still inside the previous window.
    const selectedIsStillVisible =
      selectedIndex >= previousStartIndex && selectedIndex < previousEndIndex;

    // If the expanded role falls outside the new window, expand its last item.
    // This prevents PREVIOUS from unexpectedly jumping to the first item.
    if (!selectedIsStillVisible) {
      setSelectedExperience(experiences[previousEndIndex - 1]?.id ?? null);
    }
  };

  // Move the sliding window one item toward the end of the array.
  const selectNext = () => {
    if (!hasNext) return;

    const nextStartIndex = pageStartIndex + 1;

    // This is an exclusive boundary: an index equal to nextEndIndex is outside
    // the visible window.
    const nextEndIndex = nextStartIndex + VISIBLE_COUNT;

    setPageStartIndex(nextStartIndex);

    // Keep the current role expanded when it remains in the overlapping part of
    // the old and new windows.
    const selectedIsStillVisible =
      selectedIndex >= nextStartIndex && selectedIndex < nextEndIndex;

    // If the current role has scrolled out, expand the first role in the new
    // window so the screen always has one expanded item.
    if (!selectedIsStillVisible) {
      setSelectedExperience(experiences[nextStartIndex]?.id ?? null);
    }
  };

  return (
    // Use a Three.js group so the complete UIKit screen inherits the position
    // and orientation calculated from the GLB screen mesh.
    <group
      position={screenLayout.position}
      quaternion={screenLayout.quaternion}
    >
      <Container
        // sizeX/sizeY use world units from the model. pixelSize maps the
        // 240-unit UIKit design width onto that physical screen width.
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
        // Prevent clicks on the screen UI from reaching the surrounding 3D scene
        // and triggering camera or model interactions.
        onClick={(event) => event.stopPropagation()}
      >
        {/* Static section heading above the navigation and experience list. */}
        <Text
          alignSelf="flex-start"
          color="#ffffff"
          fontSize={15}
          lineHeight={1}
          marginBottom={12}
        >
          WORK EXPERIENCES
        </Text>

        {/* Remove the PREVIOUS control on the first window. */}
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
            opacity={hasPrevious ? 1 : 0}
            backgroundColor="#ffffff"
            cursor={hasPrevious ? "pointer" : undefined}
            onClick={(event) => {
              event.stopPropagation();

              // Keep the event handler safe if the navigation state changes
              // between rendering and the click being processed.
              if (hasPrevious) {
                selectPrevious();
              }
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

        {/*
          The list grows into the space between the navigation controls. Centering
          keeps the complete group balanced when its content height changes.
        */}
        <Container
          width="100%"
          flexGrow={1}
          flexDirection="column"
          justifyContent="center"
        >
          {visibleExperiences.map((experience, index) => {
            // Exactly one visible role uses the expanded layout at a time.
            const isSelected = experience.id === selectedExperience;

            return (
              <Container
                key={experience.id}
                width="100%"
                // Prevent Yoga from shrinking an experience group when the
                // expanded card needs more vertical space.
                flexShrink={0}
                flexDirection="column"
              >
                {isSelected ? (
                  // Expanded layout: full role details and the primary action.
                  <Container
                    width="100%"
                    flexDirection="column"
                    alignItems="center"
                    paddingY={6}
                    backgroundColor="#171717"
                  >
                    {/* A missing end date marks the role as currently active. */}
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

                    {/* Keep company and date metadata grouped below the title. */}
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

                    {/* Open the existing detailed experience view for this id. */}
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
                    // Collapsed rows may grow when a long title wraps. minHeight
                    // preserves a consistent touch target for shorter titles.
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

                      // Updating the id collapses the old role and expands this
                      // role without changing pageStartIndex or row order.
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
                      {/* Convert the local window index into the global number. */}
                      {String(pageStartIndex + index + 1).padStart(2, "0")}
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

                {/* Do not render a divider after the final visible experience. */}
                {index < visibleExperiences.length - 1 && (
                  <Container
                    alignSelf="center"
                    width="100%"
                    height={2}
                    backgroundColor="#555555"
                  />
                )}
              </Container>
            );
          })}
        </Container>

        {/* Remove the NEXT control when the final experience is already visible. */}
        {hasNext && (
          <Container
            width="100%"
            height={13}
            flexShrink={0}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={3}
            borderRadius={4}
            opacity={hasNext ? 1 : 0}
            backgroundColor="#ffffff"
            cursor={hasNext ? "pointer" : undefined}
            onClick={(event) => {
              event.stopPropagation();

              // The guard mirrors selectNext and prevents an invalid page move.
              if (hasNext) {
                selectNext();
              }
            }}
          >
            <Text
              color="#171717"
              fontSize={10}
              lineHeight={1}
              fontWeight="bold"
            >
              NEXT
            </Text>

            <ChevronDownIcon width={10} height={10} color="#171717" />
          </Container>
        )}
      </Container>
    </group>
  );
}

// Format API date strings for the compact 3D display. A null/undefined end date
// represents an active role and is displayed as "Present".
function formatExperienceDate(date?: string | null): string {
  return date ? dayjs(date).format("MMM YYYY") : "Present";
}
