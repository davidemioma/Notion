"use client";

import React from "react";
import { Label } from "../ui/label";
import { ModeToggle } from "../ModeToggle";
import useSettings from "@/hooks/useSettings";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const SettingsModal = () => {
  const settings = useSettings();

  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <Label>Appearance</Label>

            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>

          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
