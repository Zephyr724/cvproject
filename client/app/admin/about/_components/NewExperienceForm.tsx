import { Button } from "@radix-ui/themes/components/button";
import YearBadgeInput from "./YearBadgeInput";

interface NewExperienceFormProps {
  onSave?: () => void;
  onCancel?: () => void;
}

const NewExperienceForm = ({ onSave, onCancel }: NewExperienceFormProps) => {
  return (
    <>
      <div className="card card-border bg-base-100 shadow-xl border boderder-neutral/20 m-2 ">
        <div className="card-body">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h2 className="card-title mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  className="input rounded-md"
                />
              </h2>
              <p className="text-sm font-semibold text-slate-400 ">
                <input
                  type="text"
                  placeholder="Company"
                  className="input input-md rounded-md"
                />
              </p>
            </div>

            <YearBadgeInput />
          </div>
          <div>
            <p>Please enter a description for this experience.</p>
          </div>

          <div>
            <p>Select related technologies (Optional):</p>
          </div>

          <div className="flex gap-2 mt-2">
            <Button color="green" onClick={onSave}>
              Save
            </Button>
            <Button color="red" onClick={onCancel}>
              Cancel
            </Button>
          </div>

          {/* <ul className="list-disc list-inside">
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
          )} */}

          {/* {showActions && (
            <EditDeleteButtons onEdit={onEdit} onDelete={onDelete} />
          )} */}
        </div>
      </div>
    </>
  );
};

export default NewExperienceForm;
