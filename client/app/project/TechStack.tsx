import React from "react";

interface Props {
  techStacks: { id: number; name: string }[];
}

const TechStack = ({ techStacks }: Props) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Tech Stack</h2>
      <div className="flex gap-x-2">
        {techStacks.map((techStack) => (
          <div key={techStack.id}>{techStack.name}</div>
        ))}
      </div>
    </>
  );
};

export default TechStack;
