"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Search, Trash, Undo } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import ConfirmModal from "@/components/modals/ConfirmModal";

const TrashBox = () => {
  const router = useRouter();

  const params = useParams();

  const [search, setSearch] = useState("");

  const removeDocument = useMutation(api.documents.removeDocument);

  const restoreDocument = useMutation(api.documents.restoreDocument);

  const archivedDocumnets = useQuery(api.documents.getArchivedDocuments);

  const filteredDocuments = archivedDocumnets?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (id: string) => {
    router.push(`/documents/${id}`);
  };

  const onRemove = (id: Id<"documents">) => {
    if (!id) return;

    const promise = removeDocument({ id });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.documentId === id) {
      router.push("/documents");
    }
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    if (!id) return;

    e.stopPropagation();

    const promise = restoreDocument({ id });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  if (archivedDocumnets === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-1 p-2">
        <Search className="h-4 w-4" />

        <Input
          className="bg-secondary h-7 px-2 focus-visible:ring-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block pb-2 text-xs text-center text-muted-foreground">
          No documents found.
        </p>

        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            className="w-full flex items-center justify-between text-primary text-sm rounded-sm hover:bg-primary/5"
            onClick={() => onClick(doc._id)}
          >
            <span className="truncate pl-2">{doc.title}</span>

            <div className="flex items-center">
              <div
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                onClick={(e) => onRestore(e, doc._id)}
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>

              <ConfirmModal onConfirm={() => onRemove(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
