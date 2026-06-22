import YearBadge from "@/app/about/_components/YearBadge";

interface EducationCardProps {
  education: {
    id: number;
    degree: string;
    institution: string;
    startDate: string | null;
    endDate?: string | null;
    description: string | null;
  };
}

function EducationCard({ education }: EducationCardProps) {
  return (
    <div key={education.id}>
      <div className="card card-border bg-neutral-content shadow-xl border boderder-neutral/20 m-2 ">
        <div className="card-body">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="card-title">{education.degree}</h2>
              <p className="text-sm font-semibold text-slate-400">
                {education.institution}
              </p>
            </div>

            <YearBadge
              startDate={education.startDate}
              endDate={education.endDate}
            />
          </div>

          <ul className="list-disc list-inside">
            {education.description?.split("\n").map((line, index) => (
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

export default EducationCard;
