"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { Item } from "./Item";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TrashBox from "./TrashBox";
import UserItem from "./UserItem";
import DocumentList from "./DocumentList";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";

const Navigation = () => {
  const router = useRouter();

  const params = useParams();

  const pathname = usePathname();

  const isResizingRef = useRef(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const navbarRef = useRef<ElementRef<"div">>(null);

  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const [isResetting, setIsResetting] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const createDocument = useMutation(api.documents.createDocument);

  const onCreateHandler = () => {
    const promise = createDocument({ title: "Untitled" }).then((id) =>
      router.push(`/documents/${id}`)
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;

    let newWidth = e.clientX;

    if (newWidth < 240) newWidth = 240;

    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;

      navbarRef.current.style.setProperty("left", `${newWidth}px`);

      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;

    document.removeEventListener("mouseup", handleMouseUp);

    document.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    e.stopPropagation();

    isResizingRef.current = true;

    document.addEventListener("mouseup", handleMouseUp);

    document.addEventListener("mousemove", handleMouseMove);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true);

      setIsCollapsed(false);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";

      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );

      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);

      setIsResetting(true);

      sidebarRef.current.style.width = "0";

      navbarRef.current.style.setProperty("width", "100%");

      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative bg-secondary h-full w-60 flex flex-col z-[99999] overflow-y-auto",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "absolute top-3 right-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 h-6 w-6 text-muted-foreground rounded-sm opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>

        <div>
          <UserItem />

          <Item label="Search" Icon={Search} isSearch onClick={() => {}} />

          <Item label="Settings" Icon={Settings} onClick={() => {}} />

          <Item label="New page" Icon={PlusCircle} onClick={onCreateHandler} />
        </div>

        <div className="mt-4">
          <DocumentList />

          <Item label="Add a page" Icon={Plus} onClick={onCreateHandler} />

          <Popover>
            <PopoverTrigger className="w-full">
              <Item label="Trash" Icon={Trash} />
            </PopoverTrigger>

            <PopoverContent
              className="p-0 w-72"
              side={isMobile ? "bottom" : "right"}
            >
              <TrashBox />
            </PopoverContent>
          </Popover>
        </div>

        <div
          className="absolute right-0 top-0 bg-primary/10 w-1 h-full opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
        />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 left-60 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent w-full px-3 py-2 ">
          {isCollapsed && (
            <MenuIcon
              role="button"
              className="h-6 w-6 text-muted-foreground"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
