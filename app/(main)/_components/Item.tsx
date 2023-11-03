"use client";

import React from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Props {
  label: string;
  Icon: LucideIcon;
  onClick?: () => void;
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export const Item = ({
  id,
  label,
  Icon,
  onClick,
  documentIcon,
  active,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: Props) => {
  const router = useRouter();

  const { user } = useUser();

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const createDocument = useMutation(api.documents.createDocument);

  const archiveDocument = useMutation(api.documents.archiveDocument);

  const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    onExpand?.();
  };

  const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) return;

    const promise = createDocument({
      title: "Untitled",
      parentDocument: id,
    }).then((docId) => {
      if (!expanded) {
        onExpand?.();
      }

      router.push(`/documents/${docId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const onArchieve = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    if (!id) return;

    const promise = archiveDocument({
      id,
    }).then(() => router.push("/documents"));

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash!",
      error: "Failed to archive note.",
    });
  };

  return (
    <div
      role="button"
      className={cn(
        "group w-full min-h-[27px] flex items-center py-1 pr-3 text-sm text-muted-foreground font-medium hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      onClick={onClick}
    >
      {!!id && (
        <div
          role="button"
          className="h-full mr-1 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role="button"
                className=" h-full ml-auto rounded-sm opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchieve}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            role="button"
            className="h-full ml-auto rounded-sm opacity-0 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            onClick={onCreate}
          >
            <Plus className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      className="flex gap-2 py-1"
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
    >
      <Skeleton className="h-4 w-4" />

      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
