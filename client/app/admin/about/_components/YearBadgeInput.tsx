"use client";

import { useState } from "react";

function YearBadgeInput() {
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2">
      <div className="grid grid-cols-2 gap-4">
        <label>
          <p className="mb-1 text-sm">Start Date</p>
          <input
            type="date"
            className="input input-bordered w-full rounded-md text-primary"
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
              disabled={isCurrentlyWorking}
            />
          )}
        </label>
      </div>
      <div>
        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            className="checkbox checkbox-sm checkbox-primary border-2 border-secondary"
            checked={isCurrentlyWorking}
            onChange={(e) => setIsCurrentlyWorking(e.target.checked)}
          />
          <span className="text-sm">Currently working here</span>
        </label>
      </div>
    </div>
  );
}

export default YearBadgeInput;
