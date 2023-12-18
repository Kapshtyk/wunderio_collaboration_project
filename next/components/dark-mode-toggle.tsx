import { useTheme } from "next-themes";
import * as React from "react";

import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex gap-4 items-center align-middle">
      <Label className="!mb-0 text-sm font-reqular">Light mode</Label>
      <Switch
        onCheckedChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
        checked={theme === "dark"}
      />
      <Label className="!mb-0 text-sm font-reqular">Dark mode</Label>
    </div>
  );
}
