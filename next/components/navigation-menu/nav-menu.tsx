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
      <NavigationMenuList className="text-sm font-semibold text-steelgray">
        {menu.map((item) => (
          item.items ? (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                <Link href={item.url}>
                  {item.title}
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white/90 backdrop-blur-sm">
                <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-3 lg:w-[600px] text-start">
                  {item.items.map((item) => (
                    <li>
                      <div key={item.id} className="text-sm p-2 font-medium font-inter leading-none mb-5">{item.title}</div>
                      <ul className="mt-2">
                        {item.items?.map((item, index) => (
                          index <= 2 && (
                            <ListItem key={item.id} href={item.url}>
                              <p className="p-2 text-scapaflow font-regular font-inter">{item.title}</p>
                            </ListItem>
                          )
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.title}>
              <Link href={item.url} >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        ))}
      </NavigationMenuList>
    </NavigationMenu >
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <Link
        href={props.href ?? ""}
        ref={ref}
        className={clsx(
          "block text-primary-500 select-none rounded-md py-2 no-underline outline-none transition-colors hover:bg-white hover:text-stone focus:bg-white focus:text-stone",
          className,
        )}
        {...props}
      >
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </Link>
    </li >
  );
});
ListItem.displayName = "ListItem";
