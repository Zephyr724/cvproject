import YearBadge from "@/app/about/_components/YearBadge";

type TechItem = {
  id: number;
  name: string;
  slug: string;
  isFrontend: boolean;
  isBackend: boolean;
};

interface ExperienceCardProps {
  experience: {
    id: number;
    title: string;
    company: string;
    startDate: string | null;
    endDate?: string | null;
    description: string;
    techItems: TechItem[];
  };
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div key={experience.id}>
      <div className="card card-border bg-base-100 shadow-xl border boderder-neutral/20 m-2 ">
        <div className="card-body">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="card-title">{experience.title}</h2>
              <p className="text-sm font-semibold text-slate-400">
                {experience.company}
              </p>
            </div>

            <YearBadge
              startDate={experience.startDate}
              endDate={experience.endDate}
            />
          </div>

          <ul className="list-disc list-inside">
            {experience.description.split("\n").map((line, index) => (
              <li key={index} className="text-md">
                {line.replace(/^- /, "")}
              </li>
            ))}
          </ul>
          {experience.techItems.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {experience.techItems.map((techItem) => (
                  <span
                    key={techItem.id}
                    className="bg-neutral text-neutral-content rounded-xl px-4 py-1 text-sm "
                  >
                    {techItem.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
