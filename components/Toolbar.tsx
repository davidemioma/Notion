"use client";

import React, { ElementRef, useRef, useState } from "react";
import { Button } from "./ui/button";
import IconPicker from "./IconPicker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import useCoverImage from "@/hooks/useCoverImage";
import { ImageIcon, Smile, X } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: Props) => {
  const coverImage = useCoverImage();

  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [value, setValue] = useState(initialData.title);

  const removeIcon = useMutation(api.documents.removeIcon);

  const updateDocument = useMutation(api.documents.updateDocument);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);

    setTimeout(() => {
      setValue(initialData.title);

      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      disableInput();
    }
  };

  const onInput = (value: string) => {
    setValue(value);

    updateDocument({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onIconSelect = (icon: string) => {
    updateDocument({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="group/icon flex items-center gap-2 pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>

          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
            onClick={onRemoveIcon}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="pt-6 text-6xl">{initialData.icon}</p>
      )}

      <div className="flex items-center gap-1 py-4 opacity-0 group-hover:opacity-100">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}

        {!initialData.coverImage && !preview && (
          <Button
            onClick={() => coverImage.onOpen()}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {isEditing && !preview ? (
        <TextareaAutosize
          className="bg-transparent text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          ref={inputRef}
          value={value}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
