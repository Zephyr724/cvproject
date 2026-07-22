import YearBadge from "@/app/about/_components/YearBadge";
import { Experience } from "@/app/admin/about/types";
import TipTapRenderer from "@/lib/tiptap/extensions/TiptapRenderer";

import EditDeleteButtons from "@/app/admin/about/_components/EditDeleteButtons";
import TiptapRenderer from "@/lib/tiptap/extensions/TiptapRenderer";
import { JSONContent } from "@tiptap/react";

interface ExperienceCardProps {
  experience: Experience;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

function ExperienceCard({
  experience,
  showActions = false,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
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

          <TiptapRenderer content={experience.description as JSONContent} />
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

          {showActions && (
            <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
