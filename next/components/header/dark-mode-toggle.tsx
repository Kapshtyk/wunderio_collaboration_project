import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import * as React from "react";

import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex gap-4 items-center align-middle">
      <Label className="!mb-0 text-sm font-reqular">{t("light_mode")}</Label>
      <Switch
        onCheckedChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        checked={theme === "dark"}
      />
      <Label className="!mb-0 text-sm font-reqular">{t("dark_mode")}</Label>
    </div>
  );
}
