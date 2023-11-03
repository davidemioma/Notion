"use client";

import React, { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import useSearch from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const SearchCommand = () => {
  const router = useRouter();

  const { user } = useUser();

  const searchModal = useSearch();

  const [isMounted, setIsMounted] = useState(false);

  const documents = useQuery(api.documents.getSearchedDocuments);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);

    searchModal.onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        searchModal.toggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [searchModal]);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={searchModal.isOpen} onOpenChange={searchModal.onClose}>
      <CommandInput placeholder={`Search ${user?.fullName}'s Jotion...`} />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={() => onSelect(doc._id)}
            >
              {doc.icon ? (
                <p className="mr-2 text-[18px]">{doc.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
