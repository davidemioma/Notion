"use client";

import React from "react";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/useScrollTop";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-background dark:bg-[#1F1F1F] flex items-center p-6",
        scrolled && "border-b shadow-sm transition"
      )}
    >
      <Logo />

      <div className="w-full flex items-center justify-between md:justify-end md:ml-auto gap-2">
        <div>login</div>

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
