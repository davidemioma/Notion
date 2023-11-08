"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import useCoverImage from "@/hooks/useCoverImage";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: Props) => {
  const params = useParams();

  const coverImage = useCoverImage();

  const { edgestore } = useEdgeStore();

  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    removeCoverImage({
      id: params.id as Id<"documents">,
    });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image className="object-cover" src={url} fill alt="Cover" />}

      {url && !preview && (
        <div className="absolute bottom-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100">
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={() => coverImage.onReplace(url)}
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>

          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={onRemove}
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
