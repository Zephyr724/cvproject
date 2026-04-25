interface Props {
  responsibilities: { id: number; name: String }[];
}

const Responsibilities = ({ responsibilities }: Props) => {
  return (
    <div className="bg-gray-600 rounded text-white p-2">
      <h2 className="text-lg font-semibold">Responsibilities</h2>
      <div className="flex gap-x-2">
        {responsibilities.map((reponsibility) => (
          <div
            className=" bg-gray-400 rounded-2xl px-2 min-w-10 whitespace-nowrap text-center"
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
