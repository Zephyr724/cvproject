interface TechItem {
  id: number;
  order: number;
  name: string;
  slug: string;
}

interface Props {
  techStack: {
    frontend?: TechItem[];
    backend?: TechItem[];
  };
}

const TechStack = ({ techStack }: Props) => {
  const categories = [
    {
      title: "Frontend",
      items: techStack.frontend,
    },
    {
      title: "Backend",
      items: techStack.backend,
    },
  ].filter(
    (category): category is { title: string; items: TechItem[] } =>
      category.items !== undefined && category.items.length > 0,
  );

  if (categories.length === 0) return null;

  return (
    <div className="bg-gray-600 rounded text-white p-3">
      <h2 className="text-lg font-semibold">Tech Stack</h2>
      <div className="flex gap-x-2 flex-wrap">
        {categories.map((categorie) => {
          const sortedItems = [...categorie.items].sort(
            (a, b) => a.order - b.order,
          );
          return (
            <div
              key={categorie.title}
              className="flex flex-1 flex-col  pr-2  rounded m-1"
            >
              <h3 className="font-bold">{categorie.title}</h3>
              <div className="flex flex-wrap gap-2 mr-10 pt-1 ">
                {sortedItems.map((item) => (
                  <div
                    className=" bg-gray-400 rounded-2xl px-2 min-w-10 whitespace-nowrap text-center"
                    key={item.slug}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechStack;
