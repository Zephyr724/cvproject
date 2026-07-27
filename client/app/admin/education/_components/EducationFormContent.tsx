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
import YearBadgeInput from "../../../components/YearBadge/YearBadgeInput";
import ContentEditorWYSIWYG from "@/app/admin/_components/ContentEditorWYSIWYG";
import { Callout } from "@radix-ui/themes/components/index";
import { ValidateCreateEducationType } from "@/app/api/educations/validationSchema";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface EducationFormContentProps {
  register: UseFormRegister<ValidateCreateEducationType>;
  control: Control<ValidateCreateEducationType>;
  errors: FieldErrors<ValidateCreateEducationType>;
  watch: UseFormWatch<ValidateCreateEducationType>;
  setValue: UseFormSetValue<ValidateCreateEducationType>;
  onSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
  onCancel: () => void;
}

const EducationFormContent = ({
  register,
  control,
  errors,
  watch,
  setValue,
  onSubmit,
  isEdit,
  onCancel,
}: EducationFormContentProps) => {
  return (
    <div className="card card-border bg-base-100 shadow-xl border boderder-neutral/20 m-2 ">
      <div className="card-body">
        {errors.degree && (
          <Callout.Root color="red">
            <Callout.Text>{errors.degree.message}</Callout.Text>
          </Callout.Root>
        )}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="card-title mb-2">
              <input
                type="text"
                placeholder="Degree"
                className="input rounded-md"
                {...register("degree")}
              />
            </h2>
            <p className="text-sm font-semibold text-slate-400 ">
              <input
                type="text"
                placeholder="Institution"
                className="input input-md rounded-md"
                {...register("institution")}
              />
            </p>
          </div>

          <YearBadgeInput
            register={register}
            watch={watch}
            setValue={setValue}
            currentField="isCurrentlyStudying"
            currentLabel="Currently studying here"
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
                    title="Education Description"
                    onChange={field.onChange}
                    initialContent={field.value}
                    haveMedia={false}
                  />
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

export default EducationFormContent;
