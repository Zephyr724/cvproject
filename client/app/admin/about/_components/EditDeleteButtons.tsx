import { Button } from "@radix-ui/themes/components/button";

interface EditDeleteButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

function EditDeleteButtons({ onEdit, onDelete }: EditDeleteButtonsProps) {
  return (
    <div className="flex gap-2 mt-2">
      <Button onClick={onEdit} color="blue">
        Edit
      </Button>
      <Button onClick={onDelete} color="red">
        Delete
      </Button>
    </div>
  );
}

export default EditDeleteButtons;
