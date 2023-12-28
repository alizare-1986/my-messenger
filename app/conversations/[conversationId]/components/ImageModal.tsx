"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";
import { FC } from "react";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}
const ImageModal: FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <Image alt="image" width={600} height={600} src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
