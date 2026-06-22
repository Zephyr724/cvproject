import YearBadge from "@/app/about/_components/YearBadge";

interface ExperienceCardProps {
  experience: {
    id: number;
    title: string;
    company: string;
    startDate: string | null;
    endDate?: string | null;
    description: string;
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
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
