interface SectionTitleProps {
  title: string;
  description: string;
  color?: string;
}

function SectionTitle({ title, description, color }: SectionTitleProps) {
  return (
    <div className={`hero bg-${color ? color : "base-200"} `}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-3">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default SectionTitle;
