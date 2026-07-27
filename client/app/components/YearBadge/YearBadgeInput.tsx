"use client";

import { useState } from "react";

import type {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { ValidateCreateExperienceType } from "@/app/api/experiences/validationSchema";
interface YearBadgeInputProps {
  register: UseFormRegister<ValidateCreateExperienceType>;
  watch: UseFormWatch<ValidateCreateExperienceType>;
  setValue: UseFormSetValue<ValidateCreateExperienceType>;
}

function YearBadgeInput({ register, watch, setValue }: YearBadgeInputProps) {
  const isCurrentlyWorking = watch("isCurrentlyWorking");

  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2">
      <div className="grid grid-cols-2 gap-4">
        <label>
          <p className="mb-1 text-sm">Start Date</p>
          <input
            type="date"
            className="input input-bordered w-full rounded-md text-primary"
            {...register("startDate")}
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
              {...register("endDate")}
            />
          )}
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary border-2 border-secondary"
            {...register("isCurrentlyWorking", {
              onChange: (e) => {
                const checked = e.target.checked;

                if (checked) {
                  setValue("endDate", "");
                }
              },
            })}
          />
          <span className="text-sm">Currently working here</span>
        </label>
      </div>
    </div>
  );
}

export default YearBadgeInput;
