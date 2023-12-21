import { useTranslation } from "next-i18next";
import { InstagramIcon } from "lucide-react";

import FacebookIcon from "@/styles/icons/facebook.svg";
import LinkedInIcon from "@/styles/icons/linkedin.svg";
import TwitterIcon from "@/styles/icons/twitter.svg";

export function SocialIcons() {
  const { t } = useTranslation();

  const data = [
    {
      id: 1,
      location: "Facebook",
      url: "https://www.facebook.com/wunder.io",
      icon: <FacebookIcon className="block h-6 w-6 text-white" />,
    },
    {
      id: 2,
      location: "Twitter",
      url: "https://twitter.com/Wunder_io",
      icon: <TwitterIcon className="block h-6 w-6 text-white" />,
    },
    {
      id: 3,
      location: "LinkedIn",
      url: "https://www.linkedin.com/company/wunder.io/",
      icon: <LinkedInIcon className="block h-6 w-6 text-white" />,
    },
    {
      id: 4,
      location: "Instagram",
      url: "https://www.instagram.com/wunder.io/",
      icon: <InstagramIcon className="block h-6 w-6 text-white" />,
    },
  ];

  return (
    <div>
      <ul className="flex flex-wrap justify-start gap-4">
        {data?.map(({ id, url, icon, location }) => (
          <li
            className="bg-primary-400 flex items-center justify-center w-10 h-10 rounded-full"
            key={id}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
              {icon}
              {location && (
                <span className="sr-only">
                  {t("share-to", {
                    location,
                  })}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
