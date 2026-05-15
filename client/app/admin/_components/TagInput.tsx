import { Badge, TextField } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface TagValue {
  id?: number;
  name?: string;
  order: number;
}

interface TagInputProps {
  value: TagValue[];
  onChange: (tags: TagValue[]) => void;
  placeholder?: string;
}

const TagInput = ({
  value,
  onChange,
  placeholder = "Press Enter or , to confirm",
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addTags = (rawString: string) => {
    const names = rawString
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) return;

    const newTags: TagValue[] = [...value];

    for (const name of names) {
      const exists = newTags.some(
        (newTag) => newTag.name?.toLowerCase() === name.toLocaleLowerCase(),
      );

      if (exists) continue;

      newTags.push({ name, order: newTags.length });
    }

    onChange(newTags);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTags(inputValue);
    }
  };

  const removeTag = (index: number) => {
    const newTags = value
      .filter((_, i) => i !== index)
      .map((tag, i) => ({
        ...tag,
        order: i,
      }));
    onChange(newTags);
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
            addTags(inputValue);
          }
        }}
        placeholder={placeholder}
      />

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag, index) => (
            <Badge key={index} size="2" variant="soft" color="indigo">
              {tag.name}
              <IconButton
                size="1"
                variant="ghost"
                color="indigo"
                onClick={() => removeTag(index)}
                className="ml-1 cursor-pointer"
                aria-label={`Remove ${tag.name}`}
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

export default TagInput;
