interface Props {
  implementations: {
    id: number;
    order: number;
    title: string;
    layoutType: string;
    contentText: {
      id: number;
      text: string;
    }[];
    contentImages: {
      id: number;
      url: string;
    }[];
    contentVideos: {
      id: number;
      url: string;
    }[];
  }[];
}

const Implementations = ({ implementations }: Props) => {
  if (!implementations) return null;

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <h2 className="text-lg font-semibold">Responsibilities</h2>
      <div className="flex gap-x-2  pt-2">
        {implementations.map((implementation) => (
          <div
            className=" bg-gray-400 rounded px-2 min-w-10 whitespace-nowrap text-center"
            key={implementation.id}
          >
            {implementation.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Implementations;
