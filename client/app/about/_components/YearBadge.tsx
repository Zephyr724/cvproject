interface YearBadgeProps {
  startDate: string | null;
  endDate?: string | null;
}

function YearBadge({ startDate, endDate }: YearBadgeProps) {
  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2 text-sm ">
      {startDate} - {endDate ? endDate : "present"}
    </div>
  );
}

export default YearBadge;
