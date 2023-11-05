"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export default function DocumentPage({
  params,
}: {
  params: { id: Id<"documents"> };
}) {
  const { id } = params;

  const document = useQuery(api.documents.getDocumentById, { id });

  if (document === undefined) {
    return (
      <div>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />

            <Skeleton className="h-4 w-[80%]" />

            <Skeleton className="h-4 w-[40%]" />

            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return <div className="pt-20 pb-40">DocumentPage {id}</div>;
}
