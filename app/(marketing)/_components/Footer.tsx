import React from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div className="bg-background dark:bg-[#1F1F1F] flex items-center w-full p-6 z-50">
      <Logo />

      <div className="w-full md:ml-auto flex items-center justify-between md:justify-end gap-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>

        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};

export default Footer;
