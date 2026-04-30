interface Props {
  responsibilities: { id: number; order: number; name: String }[];
}

const Responsibilities = ({ responsibilities }: Props) => {
  if (responsibilities.length === 0) return null;
  const sortedResponsibilities = [...responsibilities].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <h2 className="text-lg font-semibold">Responsibilities</h2>
      <div className="flex flex-wrap gap-1.5  pt-2">
        {sortedResponsibilities.map((reponsibility) => (
          <div
            className=" bg-gray-400 rounded-2xl px-2 min-w-10 flex-nowrap text-center"
            key={reponsibility.id}
          >
            {reponsibility.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Responsibilities;
