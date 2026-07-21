"use client";

import { useEffect, useRef } from "react";

interface DropdownItem {
  label: string;
  url: string;
}

interface ThreeDropdownProps {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  onClose: () => void;
}

export function ThreeDropdown({ items, onSelect, onClose }: ThreeDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 min-w-[180px] z-50 border border-gray-200 dark:border-gray-700"
      style={{ backdropFilter: "blur(4px)" }}
    >
      <div className="text-sm font-semibold px-3 py-1 border-b border-gray-200 dark:border-gray-700">
        Select Project
      </div>
      <ul className="py-1">
        {items.map((item) => (
          <li
            key={item.label}
            className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded transition-colors"
            onClick={() => onSelect(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <button
        className="mt-1 w-full text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-center py-1"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
}