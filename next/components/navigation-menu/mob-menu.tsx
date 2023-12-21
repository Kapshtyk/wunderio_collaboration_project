import Link from "next/link";
import React from "react";

import { Menu } from "@/lib/zod/menu";
import Hamburger from "@/styles/icons/menu.svg";

import { DarkModeToggle } from "@/components/header/dark-mode-toggle";
import { LanguageSwitcher } from "@/components/header/language-switcher";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";
import { useTranslation } from "next-i18next";

interface NavigationMenuProps {
  menu: Menu;
}

const MobMenu = ({ menu }: NavigationMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open mobile menu"
        aria-expanded="false"
        aria-haspopup="dialog"
      >
        <Hamburger className="desktopMenu:hidden text-main w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>{t('menu')}</SheetTitle>
          <SheetDescription>
            <ul className="flex w-full flex-col pl-4">
              {menu.map((item) => (
                <Link
                  key={item.id}
                  className="block text-main select-none rounded-md py-2 no-underline outline-none transition-colors hover:after:absolute hover:after:bottom-[-1px] hover:after:content=[''] hover:after:h-[2px] hover:after:bg-main hover:after:animate-underline"
                  href={item.url}
                >
                  <li onClick={() => setOpen(false)}>{item.title}</li>
                </Link>
              ))}
            </ul>
          </SheetDescription>
        </SheetHeader>
        <SheetTitle>{t("preferences")}</SheetTitle>
        <SheetDescription>
          {t("preferences_description")}        </SheetDescription>
        <SheetTitle>{t("theme_switcher")}</SheetTitle>
        <DarkModeToggle />
        <SheetTitle>{t("language_switcher")}</SheetTitle>
        <LanguageSwitcher />
      </SheetContent>
    </Sheet>
  );
};

export default MobMenu;
