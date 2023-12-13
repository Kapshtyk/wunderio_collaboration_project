import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/dropdown"
import { Switch } from "@/ui/switch"

export function DarkModeToggle() {
  const [theme, setThemeState] = React.useState<"dark" | "light">("light")
  const { setTheme } = useTheme()

  return (
    <Switch
      onCheckedChange={() => {
        setThemeState(theme => (theme === "dark" ? "light" : "dark"))
        setTheme(theme)
      }
      } />
  )
}
