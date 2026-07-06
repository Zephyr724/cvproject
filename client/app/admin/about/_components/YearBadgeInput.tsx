function YearBadgeInput() {
  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2">
      <div className="grid grid-cols-2 gap-4">
        <label>
          <p className="mb-1 text-sm">Start Date</p>
          <input
            type="date"
            className="input input-bordered w-full rounded-md"
          />
        </label>

        <label>
          <p className="mb-1 text-sm">End Date</p>
          <input
            type="date"
            className="input input-bordered w-full rounded-md"
          />
        </label>
      </div>
    </div>
  );
}

export default YearBadgeInput;
