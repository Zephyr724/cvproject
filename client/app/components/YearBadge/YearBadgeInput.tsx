"use client";

import { useState } from "react";

import type {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";

interface YearBadgeInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;

  currentField: Path<T>;
  currentLabel: string;
}

function YearBadgeInput<T extends FieldValues>({
  register,
  watch,
  setValue,
  currentField,
  currentLabel,
}: YearBadgeInputProps<T>) {
  const isCurrentlyWorking = watch(currentField);

  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2">
      <div className="grid grid-cols-2 gap-4">
        <label>
          <p className="mb-1 text-sm">Start Date</p>
          <input
            type="date"
            className="input input-bordered w-full rounded-md text-primary"
            {...register("startDate" as Path<T>)}
          />
        </label>

        <label>
          <p className="mb-1 text-sm ">End Date</p>
          {isCurrentlyWorking ? (
            <p className="text-md font-semibold border border-white border-radius rounded-md px-2 py-2 text-center">
              Present
            </p>
          ) : (
            <input
              type="date"
              className="input input-bordered w-full rounded-md text-primary"
              {...register("endDate" as Path<T>)}
            />
          )}
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary border-2 border-secondary"
            {...register(currentField, {
              onChange: (e) => {
                const checked = e.target.checked;

                if (checked) {
                  setValue("endDate" as Path<T>, "" as PathValue<T, Path<T>>);
                }
              },
            })}
          />
          <span className="text-sm">{currentLabel}</span>
        </label>
      </div>
    </div>
  );
}

export default YearBadgeInput;
