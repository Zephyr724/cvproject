interface YearBadgeProps {
  startDate: string | null;
  endDate?: string | null;
}

function YearBadge({ startDate, endDate }: YearBadgeProps) {
  function formatDate(date: string | null): string | null {
    if (!date) return null;

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  }

  return (
    <div className="bg-neutral text-neutral-content rounded-xl px-4 py-2 text-sm ">
      {formatDate(startDate)} - {endDate ? formatDate(endDate) : "present"}
    </div>
  );
}

export default YearBadge;
