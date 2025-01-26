"use client";

import { useEffect, useState } from "react";

import { SettingModal } from "@/components/modals/setting-modal";
import { CoverImageMoal } from "@/components/modals/cover-image-modal";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingModal />
      <CoverImageMoal />
    </>
  );
}
