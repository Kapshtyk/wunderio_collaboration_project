import * as React from "react"
import { useTheme } from "next-themes"

import { Switch } from "@/ui/switch"

export function DarkModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Switch
      onCheckedChange={() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }
      }
      checked={theme === "dark"}
    />
  )
}
