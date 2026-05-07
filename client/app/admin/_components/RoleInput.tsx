import { Badge, TextField } from "@radix-ui/themes";
import { IconButton } from "@radix-ui/themes/components/icon-button";
import { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";

interface RoleValue {
  id?: number;
  name?: string;
  order: number;
}

interface RoleInputProps {
  value: RoleValue[];
  onChange: (tags: RoleValue[]) => void;
  placeholder?: string;
}

const RoleInput = ({
  value,
  onChange,
  placeholder = "Press Enter or , to confirm",
}: RoleInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const AddRoles = (rawString: string) => {
    const names = rawString
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0);

    if (names.length === 0) return;

    const newRoles: RoleValue[] = [...value];

    for (const name of names) {
      const exists = newRoles.some(
        (newRole) => newRole.name?.toLowerCase() === name.toLocaleLowerCase(),
      );

      if (exists) continue;

      newRoles.push({ name, order: newRoles.length });
    }

    onChange(newRoles);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      AddRoles(inputValue);
    }
  };

  const removeRole = (index: number) => {
    const newRoles = value
      .filter((_, i) => i !== index)
      .map((tag, i) => ({
        ...tag,
        order: i,
      }));
    onChange(newRoles);
  };

  return (
    <div>
      <TextField.Root
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (inputValue.trim()) {
            AddRoles(inputValue);
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
                onClick={() => removeRole(index)}
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

export default RoleInput;
