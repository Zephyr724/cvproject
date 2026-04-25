import Image from "next/image";

interface Props {
  sections: {
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

const Sections = ({ sections }: Props) => {
  if (!sections) return null;

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <h2 className="text-lg font-semibold">Implementations</h2>
      {sections.map((section) => (
        <div
          className=" bg-gray-400 rounded px-2 w-full min-w-10 whitespace-nowrap text-left"
          key={section.id}
        >
          <h3> {section.title}</h3>
          <div>{section.contentText[0].text}</div>

          <div className=" w-full h-auto">
            <Image
              src={section.contentImages[0].url}
              alt=""
              width={400}
              height={300}
              className="object-cover"
            ></Image>
            <div>{section.contentText[1].text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sections;
