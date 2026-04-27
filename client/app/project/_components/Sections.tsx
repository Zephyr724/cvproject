import { Section } from "./types";
import { layoutMap, DefaultLayout } from "./cardLayouts";

interface Props {
  sections: Section[];
}

const Sections = ({ sections }: Props) => {
  if (!sections || sections.length === 0) return null;

  //sort the elements and replace the null|undefined elements with []
  const sortedSections = [...sections]
    .sort((a, b) => a.order - b.order)
    .map((section) => ({
      ...section,
      contentText: section.contentText ?? [],
      contentImages: section.contentImages ?? [],
      contentVideos: section.contentVideos ?? [],
    }));

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <h2 className="text-lg font-semibold">Implementations</h2>
      {sortedSections.map((section) => {
        //Simple Factory pattern: Get the componenets by layoutType or default

        const LayoutComponent = layoutMap[section.layoutType] || DefaultLayout;

        return (
          <div key={section.id} className="bg-gray-400 rounded p-4">
            <h3 className="text-md font-bold mb-3">{section.title}</h3>
            <LayoutComponent
              contentText={section.contentText}
              contentImages={section.contentImages}
              contentVideos={section.contentVideos}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Sections;
