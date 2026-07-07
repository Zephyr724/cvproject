"use client";

import { useEffect, useRef } from "react";

interface ProjectModalProps {
  title: string;
  url: string;      // 要展示的项目网址（支持任意前端框架）
  onClose: () => void;
}

export function ProjectModal({ title, url, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 按 ESC 关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 点击背景关闭
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
      >
        {/* 头部 */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        {/* 内容区：iframe 嵌入外部项目 */}
        <div className="flex-1 relative">
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
}