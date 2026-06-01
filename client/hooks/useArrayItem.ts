import { useCallback } from "react";

type WithId = { id?: number };

type ArrayItemHook<T> = {
  items: T[];
  addItem: () => void;
  updateItem: (index: number, partial: Partial<T>) => void;
  deleteItem: (index: number) => void;
};

export function useArrayItem<T extends WithId>(
  currentItems: T[] | undefined,
  createItem: () => T,
  onUpdate: (newItem: T[]) => void,
): ArrayItemHook<T> {
  const items = currentItems || [];

  const addItem = useCallback(() => {
    const newItems = [...items, createItem()];
    onUpdate(newItems);
  }, [items, createItem, onUpdate]);

  const updateItem = useCallback(
    (index: number, updatedData: Partial<T>) => {
      const updatedItems = items.map((item, i) =>
        i === index ? { ...item, ...updatedData } : item,
      );
      onUpdate(updatedItems);
    },
    [items, onUpdate],
  );

  const deleteItem = useCallback(
    (index: number) => {
      const filteredItems = items.filter((_, i) => i !== index);
      onUpdate(filteredItems);
    },
    [items, onUpdate],
  );

  return { items, addItem, updateItem, deleteItem };
}
