"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/useOrigin";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { Check, Copy, Globe } from "lucide-react";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";

interface Props {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: Props) => {
  const origin = useOrigin();

  const url = `${origin}/preview/${initialData._id}`;

  const [copied, setCopied] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateDocument = useMutation(api.documents.updateDocument);

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = updateDocument({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published",
      error: "Failed to publish note.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = updateDocument({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note unpublished",
      error: "Failed to unpublish note.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          <span className="text-xs sm:text-sm">
            {initialData.isPublished ? "Published" : "Publish"}
          </span>

          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-sky-500 animate-pulse" />

              <p className="text-xs font-medium text-sky-500">
                This note is live on web.
              </p>
            </div>

            <div className="flex items-center">
              <input
                className="flex-1 bg-muted h-8 px-2 text-xs border rounded-l-md truncate"
                value={url}
                disabled
              />

              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button
              className="w-full text-xs"
              size="sm"
              onClick={onUnpublish}
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 mb-2 text-muted-foreground" />

            <p className="text-sm font-medium mb-2">Publish this note</p>

            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others.
            </span>

            <Button
              className="w-full text-xs"
              size="sm"
              onClick={onPublish}
              disabled={isSubmitting}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
