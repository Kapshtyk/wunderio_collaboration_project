import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { Menu } from "@/lib/zod/menu";
import SearchIcon from "@/styles/icons/search.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

import MobMenu from "../navigation-menu/mob-menu";
import { NavigationMenuDesktop } from "../navigation-menu/nav-menu";

import SecondaryMenu from "./secondary-menu";

interface HeaderProps {
  menu: Menu;
}

export function Header({ menu }: HeaderProps) {
  return (
    <header className="z-50 flex-shrink-0 border-b bg-background border-foreground/15 md:sticky md:top-0">
      <div className="mx-auto relative flex px-6 sm:px-28 h-20 flex-row items-center justify-between">
        <HomeLink />
        <NavigationMenuDesktop menu={menu} />
        <MobMenu menu={menu} />
        <div className="hidden desktopMenu:flex justify-end">
          <SecondaryMenu />
        </div>
      </div>
    </header>
  );
}

function HomeLink() {
  const { locale } = useRouter();
  const { t } = useTranslation();
  return (
    <Link href="/" locale={locale} className="inline pb-3">
      <WunderIcon className="w-32 text-main" />
      <span className="sr-only">{t("homepage-link")}</span>
    </Link>
  );
}

export function SearchLink() {
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
