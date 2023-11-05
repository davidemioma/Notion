"use client";

import React from "react";
import { useTheme } from "next-themes";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  asChild?: boolean;
  children: React.ReactNode;
  onChange: (icon: string) => void;
}

const IconPicker = ({ children, asChild, onChange }: Props) => {
  const { resolvedTheme } = useTheme();

  const currentTheme = (resolvedTheme || "light") as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>

      <PopoverContent className="w-full p-0 border-none shadow-none">
        <EmojiPicker
          height={350}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;
