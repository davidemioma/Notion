"use client";

import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import useScrollTop from "@/hooks/useScrollTop";
import { ModeToggle } from "@/components/ModeToggle";
import { SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const scrolled = useScrollTop();

  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-background dark:bg-[#1F1F1F] flex items-center p-6",
        scrolled && "border-b shadow-sm transition"
      )}
    >
      <Logo />

      <div className="w-full flex items-center justify-between md:justify-end md:ml-auto gap-2">
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>

            <SignInButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Jotion</Link>
            </Button>

            <UserButton afterSignOutUrl="/" />
          </>
        )}

        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
