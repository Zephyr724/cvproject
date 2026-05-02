"use client";

import { useRouter } from "next/navigation";

interface Props {
  closeHref?: string;
}

const CloseButton = ({ closeHref }: Props) => {
  const router = useRouter();
  return (
    <button
      className="btn btn-sm btn-circle  right-2 top-2"
      onClick={() => (closeHref ? router.push(`${closeHref}`) : router.back())}
      aria-label="Close"
    >
      ✕
    </button>
  );
};

export default CloseButton;
