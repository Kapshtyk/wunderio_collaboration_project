import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";
import {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import parse from "html-react-parser";

import { isRelative } from "@/lib/utils";
import ExternalLink from "@/styles/icons/external-link.svg";

import { env } from "@/env";

const isElement = (domNode: DOMNode): domNode is Element =>
  domNode.type === "tag";

const options: HTMLReactParserOptions = {
  /*
   * If `undefined` is returned from this `replace` function, nothing is changed and the given DOMNode is rendered as usual.
   * But if anything else is returned, that value replaces the original value.
   * For example, return `null` to remove it, or some other component to replace it.
   */
  replace: (domNode) => {
    if (!isElement(domNode)) return;

    //< <img src alt data-entity-uuid data-entity-type height width data-caption data-align>

    switch (domNode.name) {
      case "img": {
        const { src, alt, width = 100, height = 100 } = domNode.attribs;

        const numberWidth = Number(width);
        const numberHeight = Number(height);

        if (isRelative(src)) {
          return (
            <Image
              src={`${env.NEXT_PUBLIC_DRUPAL_BASE_URL}${src}`}
              width={numberWidth}
              height={numberHeight}
              alt={alt}
              className="max-w-full object-cover"
            />
          );
        }
        break;
      }
      case "div": {
        if (domNode.attribs.title === "layout") {
          return (
            <div className=" w-full grid grid-cols-2 gap-8 group/layout">
              {domToReact(domNode.children, options)}
            </div>
          );
        }
        break;
      }

      case "strong": {
        return (
          <strong className="font-bold">
            {domToReact(domNode.children, options)}
          </strong>
        );
      }

      case "em": {
        return (
          <em className="italic">{domToReact(domNode.children, options)}</em>
        );
      }

      case "br": {
        return <br className="mb-4 border-b-2 border-red-500" />;
      }

      case "h2": {
        return (
          <h2 className="text-heading-xl text-main font-semibold">
            {domToReact(domNode.children, options)}
          </h2>
        );
      }

      case "h3": {
        return (
          <h3 className="text-xl font-bold text-main mb-4">
            {domToReact(domNode.children, options)}
          </h3>
        );
      }

      case "h4": {
        return (
          <h4 className="text-lg font-bold text-main mb-4">
            {domToReact(domNode.children, options)}
          </h4>
        );
      }

      case "h5": {
        return (
          <h5 className="text-base font-bold text-main mb-4">
            {domToReact(domNode.children, options)}
          </h5>
        );
      }

      case "h6": {
        return (
          <h6 className="text-sm font-bold text-main mb-4">
            {domToReact(domNode.children, options)}
          </h6>
        );
      }

      case "a": {
        const { href } = domNode.attribs;

        if (href && isRelative(href)) {
          return (
            <Link href={href} className="underline text-main">
              {domToReact(domNode.children, options)}
            </Link>
          );
        } else if (href) {
          return (
            <Link
              href={href}
              target="_blank"
              className="underline text-main gap-1 items-center justify-start"
            >
              {domToReact(domNode.children, options)}
              <ExternalLink className="inline-block ml-1 w-4 h-4" />
            </Link>
          );
        }
        break;
      }

      case "p": {
        return (
          <p className="mb-4 text-xl font-regular pr-56 group-first/layout:pr-0 group-first/testimonials:pr-0 ">
            {domToReact(domNode.children, options)}
          </p>
        );
      }

      case "input": {
        if (domNode.attribs.value === "") {
          delete domNode.attribs.value;
        }

        return domNode;
      }

      case "q": {
        return (
          <blockquote className="italic">
            {domToReact(domNode.children, options)}
          </blockquote>
        );
      }

      case "ul": {
        return (
          <ul className="marker:text-main list-disc pl-4 space-y-4">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }

      case "li": {
        return (
          <li className="group-first:text-lg text-xl">
            {domToReact(domNode.children, options)}
          </li>
        );
      }

      default: {
        return undefined;
      }
    }
  },
};

interface FormattedTextProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function FormattedText({ html, ...props }: FormattedTextProps) {
  return <div {...props}>{parse(html, options)}</div>;
}
