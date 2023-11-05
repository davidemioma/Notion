"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  initialData: Doc<"documents">;
}

export const Title = ({ initialData }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(initialData.title || "Untitled");

  const updateDocument = useMutation(api.documents.updateDocument);

  const enableInput = () => {
    setTitle(initialData.title);

    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();

      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    updateDocument({
      id: initialData._id,
      title: e.target.value || "Untitled",
    });
  };

  return (
    <div className="flex items-center gap-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}

      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          value={title}
          onClick={enableInput}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={() => setIsEditing(false)}
        />
      ) : (
        <Button
          className="font-normal h-auto p-1"
          variant="ghost"
          size="sm"
          onClick={enableInput}
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
