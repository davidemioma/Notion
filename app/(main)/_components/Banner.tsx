"use client";

import React from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import ConfirmModal from "@/components/modals/ConfirmModal";

interface Props {
  id: Id<"documents">;
}

const Banner = ({ id }: Props) => {
  const router = useRouter();

  const removeDocument = useMutation(api.documents.removeDocument);

  const restoreDocument = useMutation(api.documents.restoreDocument);

  const onRemove = () => {
    const promise = removeDocument({ id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restoreDocument({ id });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 flex items-center justify-center gap-2 p-2 text-white text-center text-sm">
      <p>This page is in the Trash.</p>

      <Button
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        size="sm"
        variant="outline"
        onClick={onRestore}
      >
        Restore page
      </Button>

      <ConfirmModal onConfirm={onRemove}>
        <Button
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
          size="sm"
          variant="outline"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
