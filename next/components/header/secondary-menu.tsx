import { useTranslation } from "next-i18next";
import React from "react";

import Cog from "@/styles/icons/cog.svg";

import { DarkModeToggle } from "./dark-mode-toggle";
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
  const { t } = useTranslation();
  return (
    <Sheet>
      <SheetTrigger>
        <Cog className="w-8 h-8" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("preferences")}</SheetTitle>
          <SheetDescription>{t("preferences_description")}</SheetDescription>
        </SheetHeader>
        <SheetTitle>{t("theme_switcher")}</SheetTitle>
        <DarkModeToggle />
        <SheetTitle>{t("language_switcher")}</SheetTitle>
        <LanguageSwitcher />
      </SheetContent>
    </Sheet>
  );
};

export default SecondaryMenu;
