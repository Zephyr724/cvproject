import {
  ValidateCreateExperienceType,
  TechItem,
} from "@/app/api/experiences/validationSchema";
import dynamic from "next/dynamic";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Button } from "@radix-ui/themes/components/button";
import TechItemInput from "@/app/admin/_components/TechItemInput";
import YearBadgeInput from "../../../components/YearBadge/YearBadgeInput";
import ContentEditorWYSIWYG from "@/app/admin/_components/ContentEditorWYSIWYG";
import { Callout } from "@radix-ui/themes/components/index";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface ExperienceFormContentProps {
  register: UseFormRegister<ValidateCreateExperienceType>;
  control: Control<ValidateCreateExperienceType>;
  errors: FieldErrors<ValidateCreateExperienceType>;
  watch: UseFormWatch<ValidateCreateExperienceType>;
  setValue: UseFormSetValue<ValidateCreateExperienceType>;
  onSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
  onCancel: () => void;
}

const ExperienceFormContent = ({
  register,
  control,
  errors,
  watch,
  setValue,
  onSubmit,
  isEdit,
  onCancel,
}: ExperienceFormContentProps) => {
  return (
    <div className="card card-border bg-base-100 shadow-xl border boderder-neutral/20 m-2 ">
      <div className="card-body">
        {errors.title && (
          <Callout.Root color="red">
            <Callout.Text>{errors.title.message}</Callout.Text>
          </Callout.Root>
        )}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="card-title mb-2">
              <input
                type="text"
                placeholder="Title"
                className="input rounded-md"
                {...register("title")}
              />
            </h2>
            <p className="text-sm font-semibold text-slate-400 ">
              <input
                type="text"
                placeholder="Company"
                className="input input-md rounded-md"
                {...register("company")}
              />
            </p>
          </div>

          <YearBadgeInput
            register={register}
            watch={watch}
            setValue={setValue}
            currentField="isCurrentlyWorking"
            currentLabel="Currently working here"
          />
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <ContentEditorWYSIWYG
                    title="Experience Description"
                    onChange={field.onChange}
                    initialContent={field.value}
                    haveMedia={false}
                  />
                </>
              );
            }}
          />
        </div>

        <div>
          <Controller
            name="techItems"
            control={control}
            render={({ field }) => {
              const allItems: TechItem[] = field.value ?? [];
              return (
                <>
                  <div>
                    <label>Select related technologies (Optional):</label>
                    <TechItemInput
                      value={allItems}
                      placeholder="Enter React, Vue, Next.js… press Enter to confirm"
                      category="frontend"
                      onChange={field.onChange}
                    />
                  </div>
                </>
              );
            }}
          />
        </div>

        <div className="flex gap-2 mt-2">
          <Button color="green" onClick={onSubmit}>
            Save
          </Button>
          <Button color="red" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceFormContent;
