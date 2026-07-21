"use client";

import { useState } from "react";
import { HouseCanvas } from "./HouseCanvas";
import { ProjectModal } from "./HouseModal";  // 你命名的是 HouseModal 里的 ProjectModal
import { UIButtons } from "./UIButtons";
import { CameraProvider } from "../context/CameraContext";

export default function HomeClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalUrl, setModalUrl] = useState("");

  const handleOpenModal = (title: string, url: string) => {
    setModalTitle(title);
    setModalUrl(url);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <CameraProvider>
      <div className="w-full h-screen relative">
        <HouseCanvas onOpenModal={handleOpenModal} />
        <UIButtons />
        {modalOpen && (
          <ProjectModal
            title={modalTitle}
            url={modalUrl}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </CameraProvider>
  );
}