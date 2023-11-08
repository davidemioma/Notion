"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import useCoverImage from "@/hooks/useCoverImage";
import { Id } from "@/convex/_generated/dataModel";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const CoverImageModal = () => {
  const params = useParams();

  const coverImage = useCoverImage();

  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateDocument = useMutation(api.documents.updateDocument);

  const onClose = () => {
    setFile(undefined);

    setIsSubmitting(false);

    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file);

      setIsSubmitting(true);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await updateDocument({
        id: params.id as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg text-center font-semibold">Cover Image</h2>
        </DialogHeader>

        <SingleImageDropzone
          className="w-full outline-none"
          value={file}
          disabled={isSubmitting}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
