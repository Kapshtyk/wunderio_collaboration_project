import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { ContactForm } from "@/components/contact-form";
import { SocialIcons } from "@/components/footer/social-share";
import type { Menu, MenuItem } from "@/lib/zod/menu";
import Watermark from "@/styles/icons/watermark.svg";
import WunderIcon from "@/styles/icons/wunder.svg";

interface FooterProps {
  menus: {
    main: Menu;
    footer: Menu;
  };
}

export function Footer({ menus }: FooterProps) {
  // Only show the menu items that match the current locale:
  const { t } = useTranslation();
  const { locale } = useRouter();
  const filteredFooterMenuItems = menus.footer.filter(
    (link) => link.langcode == locale,
  );

  return (
    <footer className="bg-primary-500 py-24 section-margin relative">
      <Watermark className="z-20 absolute text-primary-300/50 top-0 -right-4 w-60 h-32" />
      <nav className="flex flex-col gap-12 lg:flex-row justify-between mx-auto max-w-6xl px-4 md:px-6 lg:px-8 text-white">
        <div className="flex flex-col gap-10">
          <WunderIcon className="w-24 text-white" />
          <div>
            <p className="text-white text-sm mb-0">{`© ${new Date().getFullYear()} Wunder`}</p>
            <p className="text-white text-sm mb-0">
              {t("all-rights-reserved")}
            </p>
          </div>
          <SocialIcons />
        </div>
        <div className="flex gap-8 flex-col 2sm:flex-row justify-between lg:justify-end">
          <div className="flex flex-col mr-4 md:mr-6 lg:mr-10">
            <h2 className="text-heading-xs text-white mt-0">{t("company")}</h2>
            <ul className="flex flex-col gap-3">
              {menus.main.map((link) => (
                <li className="mb-0" key={link.id}>
                  <FooterLink href={link.url}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col mr-4 md:mr-6 lg:mr-10">
            <h2 className="text-heading-xs text-white mt-0">{t("support")}</h2>
            <ul className="flex flex-col gap-3">
              {filteredFooterMenuItems.map((link) => (
                <li className="mb-0" key={link.id}>
                  <FooterLink href={link.url}>{link.title}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h2 className="text-heading-xs text-white mt-0">
              {t("stay-up-to-date")}
            </h2>
            <ContactForm />
          </div>
        </div>
      </nav>
    </footer>
  );
}

interface FooterLinkProps {
  href: MenuItem["url"];
  newTab?: boolean;
  children: React.ReactNode;
}

function FooterLink({ href, newTab = false, children }: FooterLinkProps) {
  const [target, rel] = newTab ? ["_blank", "noreferrer"] : [];

  return (
    <Link href={href} target={target} rel={rel}>
      <p className="text-white mb-0">{children}</p>
    </Link>
  );
}
