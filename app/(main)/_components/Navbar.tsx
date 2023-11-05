"use client";

import React from "react";
import Banner from "./Banner";
import { Menu } from "./Menu";
import { Title } from "./Title";
import Publish from "./Publish";
import { MenuIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: Props) => {
  const params = useParams();

  const document = useQuery(api.documents.getDocumentById, {
    id: params.id as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] w-full flex items-center justify-between px-3 py-2">
        <Title.Skeleton />

        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="w-full bg-background dark:bg-[#1F1F1F] flex items-center gap-x-4 px-3 py-2">
        {isCollapsed && (
          <MenuIcon
            role="button"
            className="h-6 w-6 text-muted-foreground"
            onClick={onResetWidth}
          />
        )}

        <div className="w-full flex items-center justify-between">
          <Title initialData={document} />

          <div className="flex items-center gap-2">
            <Publish initialData={document} />

            <Menu id={document._id} />
          </div>
        </div>
      </nav>

      {document.isArchived && <Banner id={document._id} />}
    </>
  );
};

export default Navbar;
