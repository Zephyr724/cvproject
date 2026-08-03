import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { experienceService } from "@/lib/server/services/experience.service";
import { educationService } from "@/lib/server/services/education.service";
import SectionTitle from "./about/_components/SectionTitle";
import ExperienceCard from "./components/ExperienceCard";
import EducationCard from "./components/EducationCard";
import { projectService } from "@/lib/server/services/project.service";
import ProjectCard from "./components/ProjectCard";
import { Button } from "@radix-ui/themes";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const experiences = await experienceService.getAllExperiences();
  const educations = await educationService.getAllEducations();
  const projects = await projectService.getAccessibleProjectsList(session);

  return (
    <div className="w-full">
      <main>
        <div>
          <SectionTitle
            title={`Hello ${session?.user?.name ?? ""}`}
            description=""
            color="neutral-content"
          />
          <Button>Hire Me</Button>
        </div>

        <div>
          <SectionTitle
            title="Experience"
            description="Here are some of my work experiences."
          />
          {experiences?.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>

        <div>
          <SectionTitle
            title="Project"
            description=""
            color="neutral-content"
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-3 place-items-start p-3">
            {projects?.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle
            title="Education"
            description="Here are some of my educational achievements."
            color="neutral-content"
          />
          {educations?.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </div>

        <div>
          <SectionTitle
            title="Contact Card"
            description="Contact me here~"
            color="neutral-content"
          />
        </div>
      </main>
    </div>
  );
}
