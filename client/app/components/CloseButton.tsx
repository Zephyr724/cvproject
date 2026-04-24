"use client";

import { useRouter } from "next/navigation";

const CloseButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-sm btn-circle  right-2 top-2"
      onClick={() => router.back()}
      aria-label="Close"
    >
      ✕
    </button>
  );
};

export default CloseButton;
