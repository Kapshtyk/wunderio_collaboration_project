import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";

import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio";

export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();
  const { push, locale } = useRouter();
  const { t } = useTranslation();
  const [curvalue, setcurValue] = useState(locale);
  const { path } = languageLinks[curvalue];

  useEffect(() => {
    push(path, undefined, { locale: curvalue })
      .then(() => window.scrollTo(0, 0))
      .catch(console.error);
  }, [curvalue, path, push]);

  return (
    <div>
      <span className="sr-only">{t("language-switcher")}</span>
      <RadioGroup
        className="grid-cols-3 items-center align-middle"
        defaultValue={curvalue}
        onValueChange={setcurValue}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="en" id="en" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="en">
            English
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fi" id="fi" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="fi">
            Finnish
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sv" id="sv" />
          <Label className="!mb-0 text-sm font-reqular" htmlFor="sv">
            Swedish
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

{
  /* <li key={l}>
<Link
  className="block p-2 hover:bg-primary-50"
  locale={l}
  href={path}
>
  {name}
</Link>
</li> */
}
