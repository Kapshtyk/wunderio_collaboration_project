import { Menu } from '@/lib/zod/menu';
import Link from "next/link";
import React, { useEffect, useState } from "react";

import clsx from "clsx";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/navigation-menu";

interface NavigationMenuProps {
  menu: Menu;
}

export function NavigationMenuDemo({ menu }: NavigationMenuProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    isClient &&
    <NavigationMenu>
      <NavigationMenuList className="text-sm font-semibold text-steelgray after:">
        {menu.map((item) => (
          item.items ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px] text-start">
                  {item.items.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.url}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link href={item.url} >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="bg-white">
      <Link
        href={props.href ?? ""}
        ref={ref}
        className={clsx(
          "block text-primary-500 bg-accent-orange select-none space-y-1 rounded-md p-3 no-underline outline-none transition-colors hover:bg-white hover:text-stone focus:bg-white focus:text-stone",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
