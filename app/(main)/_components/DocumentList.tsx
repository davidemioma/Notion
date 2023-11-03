"use client";

import React, { useState } from "react";
import { Item } from "./Item";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useParams } from "next/navigation";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { FileIcon } from "lucide-react";

interface Props {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

const DocumentList = ({ parentDocumentId, level = 0 }: Props) => {
  const params = useParams();

  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const documents = useQuery(api.documents.getDocumentsByUserId, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />

        {level === 0 && (
          <>
            <Item.Skeleton level={level} />

            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
      >
        No pages inside
      </p>

      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            label={doc.title}
            Icon={FileIcon}
            documentIcon={doc.icon}
            active={params.id === doc._id}
            level={level}
            expanded={expanded[doc._id]}
            onClick={() => onRedirect(doc._id)}
            onExpand={() => onExpand(doc._id)}
          />

          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
