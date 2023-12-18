import React from "react";

import Cog from "@/styles/icons/cog.svg";

import { DarkModeToggle } from "../dark-mode-toggle";

import { LanguageSwitcher } from "./language-switcher";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

const SecondaryMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Cog className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Preferences</SheetTitle>
          <SheetDescription>
            Here you can change your preferences related to the language and
            theme
          </SheetDescription>
        </SheetHeader>
        <SheetTitle>Theme switcher</SheetTitle>
        <DarkModeToggle />
        <SheetTitle>Language switcher</SheetTitle>
        <LanguageSwitcher />
      </SheetContent>
    </Sheet>
  );
};

export default SecondaryMenu;
