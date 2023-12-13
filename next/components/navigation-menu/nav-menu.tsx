import Link from "next/link";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { Menu } from "@/lib/zod/menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
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
  }, []);

  return (
    isClient && (
      <NavigationMenu>
        <NavigationMenuList>
          {menu.map((item) =>
            item.items ? (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                  <Link className="text-md font-medium" href={item.url}>
                    {item.title}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background/90 backdrop-blur-sm rounded-md">
                  <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-3 lg:w-[600px] text-start">
                    {item.items.map((item) => (
                      <li key={item.id}>
                        <div
                          key={item.id}
                          className="text-md p-2 text-main font-medium font-inter mb-5"
                        >
                          {item.title}
                        </div>
                        <ul className="mt-2">
                          {item.items?.map(
                            (item, index) =>
                              index <= 2 && (
                                <ListItem key={item.id} href={item.url}>
                                  <p className="p-2 text-foreground font-regular font-inter">
                                    {item.title}
                                  </p>
                                </ListItem>
                              ),
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="relative" key={item.title}>
                <Link
                  href={item.url}
                  className={`text-md font-medium p-8 hover:after:absolute hover:after:bottom-[-5px] hover:after:scale-x-90 hover:after:content=[''] hover:after:h-[2px] hover:after:left-0 hover:after:bg-main hover:after:animate-underline`}
                >
                  {item.title}
                </Link>
              </NavigationMenuItem>
            ),
          )}
        </NavigationMenuList>
      </NavigationMenu>
    )
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li className="relative">
      <Link
        href={props.href ?? ""}
        ref={ref}
        className={clsx(
          "block text-main select-none rounded-md py-2 no-underline outline-none transition-colors hover:after:absolute hover:after:bottom-[-1px] hover:after:content=[''] hover:after:h-[2px] hover:after:bg-main hover:after:animate-underline",
          className,
        )}
        {...props}
      >
        <p className="line-clamp-2 text-sm text-main leading-snug">
          {children}
        </p>
      </Link>
    </li>
  );
});
ListItem.displayName = "ListItem";
