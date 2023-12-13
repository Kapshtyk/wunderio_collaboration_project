import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { MainMenu } from "@/components/main-menu/main-menu";
import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

import { DarkModeToggle } from "../dark-mode-toggle";
import { NavigationMenuDemo } from "../navigation-menu/nav-menu";

import { LanguageSwitcher } from "./language-switcher";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);

  return (
    <header className="z-50 flex-shrink-0 border-b bg-background border-foreground/15 md:sticky md:top-0">
      <nav className="mx-auto relative flex px-6 sm:px-28 h-20 flex-row items-center justify-between py-4">
        <HomeLink />
        <NavigationMenuDemo menu={menu} />
        <div className="flex flex-row items-center justify-end gap-6 sm:gap-8">
          <SearchLink />
          <DarkModeToggle />
          {/* <UserMenu /> */}
          <LanguageSwitcher />
          {/*  <MenuToggle isOpen={isMainMenuOpen} setIsOpen={setIsMainMenuOpen} /> */}
        </div>
      </nav>
      <MainMenu
        menu={menu}
        isOpen={isMainMenuOpen}
        setIsOpen={setIsMainMenuOpen}
      />
    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline">
      <WunderIcon className="w-32 text-main" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

function SearchLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/search" locale={locale} className="hover:underline">
      <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
        {t("search")}
      </span>
      <SearchIcon className="inline-block h-6 w-6" aria-hidden="true" />
    </Link>
  );
}
