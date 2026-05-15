import { Badge, TextField } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface TechItem {
  id?: number;
  name?: string;
  order: number;
  slug?: string;
  category: "frontend" | "backend";
}

interface TechItemInputProps {
  value: TechItem[];
  onChange: (TechItems: TechItem[]) => void;
  placeholder?: string;
  category: "frontend" | "backend";
}

const TechItemInput = ({
  value,
  onChange,
  placeholder = "Press Enter or , to confirm",
  category,
}: TechItemInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const AddTechItems = (rawString: string) => {
    const names = rawString
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) return;

    const newTechItems: TechItem[] = [...value];

    for (const name of names) {
      const exists = newTechItems.some(
        (newtechItem) =>
          newtechItem.name?.toLowerCase() === name.toLocaleLowerCase(),
      );

      if (exists) continue;

      newTechItems.push({
        name,
        order: newTechItems.length,
        category: category,
        slug: name.toLowerCase(),
      });
    }

    onChange(newTechItems);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      AddTechItems(inputValue);
    }
  };

  const removetechItem = (index: number) => {
    const newTechItems = value
      .filter((_, i) => i !== index)
      .map((techItem, i) => ({
        ...techItem,
        order: i,
      }));
    onChange(newTechItems);
  };

  return (
    <div className="space-y-0.5">
      <TextField.Root
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) {
            AddTechItems(inputValue);
          }
        }}
        placeholder={placeholder}
      />

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((techItem, index) => (
            <Badge key={index} size="2" variant="soft" color="indigo">
              {techItem.name}
              <IconButton
                size="1"
                variant="ghost"
                color="indigo"
                onClick={() => removetechItem(index)}
                className="ml-1 cursor-pointer"
                aria-label={`Remove ${techItem.name}`}
              >
                <RxCrossCircled />
              </IconButton>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechItemInput;
