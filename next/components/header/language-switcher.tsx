import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";

import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio";

export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();
  const { push, locale } = useRouter();
  const { t } = useTranslation();
  const curvalue = useState(locale)[0];

  const changeLocale = (locale) => {
    const { path } = languageLinks[locale];
    const scroll = window.scrollY;
    push(path, undefined, { locale })
      .then(() => {
        window.scrollTo(0, scroll);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <span className="sr-only">{t("language-switcher")}</span>
      <RadioGroup
        className="grid-cols-3 items-center align-middle"
        defaultValue={curvalue}
        onValueChange={changeLocale}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="en" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="en">
            {t("english")}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fi" id="fi" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="fi">
            {t("finnish")}
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sv" id="sv" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="sv">
            {t("swedish")}
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
