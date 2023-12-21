import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";

import { formatDate, getCurrentDateInMySqlFormat } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";
import CookiesIcon from "@/styles/icons/cookies.svg";

import { Accordion } from "@/ui/accordion";
import { Button } from "@/ui/button";
import { Switch } from "@/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";

const Cookies = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [currentMenu, setCurrentMenu] = useState("consent");
  const [isClient, setIsClient] = useState(false);
  const [isConsentDateAvailable, setIsConsentDateAvailable] = useState(true);

  // All these booleans are using within eval() function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNecessaryCookiesAvailable, setIsNecessaryCookiesAvailable] =
    useState(true);
  const [isFunctionalCookiesAvailable, setIsFunctionalCookiesAvailable] =
    useState(false);
  const [isAnalyticsCookiesAvailable, setIsAnalyticsCookiesAvailable] =
    useState(false);
  const [isPerformanceCookiesAvailable, setIsPerformanceCookiesAvailable] =
    useState(false);
  const [isAdvertisingCookiesAvailable, setIsAdvertisingCookiesAvailable] =
    useState(false);

  const headings = ["Consent", "Preferences"];
  const cookiesTypes = [
    "Necessary",
    "Functional",
    "Analytics",
    "Performance",
    "Advertising",
  ];

  useEffect(() => {
    setIsClient(true);
    checkConsentCookie();
  }, []);

  const checkConsentCookie = () => {
    const consentCookie = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("consentData="));
    if (consentCookie) {
      const jsonData = JSON.parse(consentCookie.split("consentData=")[1]);
      setIsFunctionalCookiesAvailable(jsonData.isFunctionalCookiesAvailable);
      setIsAnalyticsCookiesAvailable(jsonData.isAnalyticsCookiesAvailable);
      setIsPerformanceCookiesAvailable(jsonData.isPerformanceCookiesAvailable);
      setIsAdvertisingCookiesAvailable(jsonData.isAdvertisingCookiesAvailable);

      // Update Matomo consent
      if (jsonData.isAnalyticsCookiesAvailable) {
        window._paq.push(["rememberCookieConsentGiven", 24 * 181]);
      } else {
        window._paq.push(["forgetCookieConsentGiven"]);
      }
    } else {
      setIsConsentDateAvailable(false);
    }
  };

  const addToCookie = (consentData, id) => {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 6),
    );
    const consentObject = {
      ...consentData,
      consentDate: formatDate(new Date().toDateString(), router.locale),
      isNecessaryCookiesAvailable: true,
    };
    if (id) {
      consentObject.id = id;
    }
    const consentDataString = JSON.stringify(consentObject);
    document.cookie = `consentData=${consentDataString}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const handleAcceptCookies = async (type: string) => {
    let body;
    if (type === "necessary") {
      body = {
        consentDate: getCurrentDateInMySqlFormat(),
      };
    } else if (type === "all") {
      body = {
        isFunctionalCookiesAvailable: true,
        isAnalyticsCookiesAvailable: true,
        isPerformanceCookiesAvailable: true,
        isAdvertisingCookiesAvailable: true,
        consentDate: getCurrentDateInMySqlFormat(),
      };
    } else if (type === "preferences") {
      body = {
        isFunctionalCookiesAvailable,
        isAnalyticsCookiesAvailable,
        isPerformanceCookiesAvailable,
        isAdvertisingCookiesAvailable,
        consentDate: getCurrentDateInMySqlFormat(),
      };
    }
    const response = await fetch("/api/cookies", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const result = await response.json();
      addToCookie(body, result.id);
    } else {
      addToCookie(body, null);
    }
    checkConsentCookie();
    setIsConsentDateAvailable(true);
  };

  const mainButtons = () => {
    return (
      <>
        <CookiesButton onClick={() => handleAcceptCookies("necessary")}>
          {t("cookies-necessary")}
        </CookiesButton>
        <CookiesButton onClick={() => handleAcceptCookies("all")}>
          {t("cookies-accept-all")}
        </CookiesButton>
      </>
    );
  };

  const preferencesButtons = () => {
    if (currentMenu === "consent") {
      return (
        <CookiesButton onClick={() => setCurrentMenu("preferences")}>
          {t("cookies-settings")}
          <ArrowIcon aria-hidden className="ml-1 h-6 w-6 -rotate-90" />
        </CookiesButton>
      );
    }
    if (currentMenu === "preferences") {
      return (
        <CookiesButton onClick={() => handleAcceptCookies("preferences")}>
          {t("cookies-save")}
        </CookiesButton>
      );
    }
    return null;
  };

  const getTableRows = () => {
    const currentDate = new Date();
    const expirationDate = new Date(
      currentDate.setMonth(currentDate.getMonth() + 6),
    );
    return {
      Necessary: [
        {
          title: "consentData",
          description:
            "We set this cookie to remember users' consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.",
          expire: "6 months",
        },
      ],
      Functional: [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expire: formatDate(expirationDate.toDateString(), router.locale),
        },
      ],
      Analytics: [
        {
          title: "mtm_cookie_consent",
          description:
            "This cookie is used by the Matomo Analytics service to remember the consent given by the user in relation to the analytics cookies.",
          expire: "181 days",
        },
      ],
      Performance: [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expire: formatDate(expirationDate.toDateString(), router.locale),
        },
      ],
      Advertising: [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expire: formatDate(expirationDate.toDateString(), router.locale),
        },
      ],
    };
  };

  const getCookiesTable = (cookieType: string) => {
    return (
      <Table className="text-xs md:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              {t("cookies-table-title")}
            </TableHead>
            <TableHead>{t("cookies-table-description")}</TableHead>
            <TableHead className="text-right">
              {t("cookies-table-expiration")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getTableRows()[cookieType].map((row) => {
            return (
              <TableRow key={row.title}>
                <TableCell className="w-[100px]">{row.title}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell className="text-right">{row.expire}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const getAccordionItems = () => {
    return cookiesTypes.map((cookieType) => {
      return {
        id: cookieType,
        heading: (
          <>
            <p className="text-foreground !mb-0">
              {t(`cookies-${cookieType.toLocaleLowerCase()}-title`)}
            </p>
            {isClient && (
              <div
                className="flex items-center gap-2 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <p
                  className={`text-xs !mb-0 ${
                    eval(`is${cookieType}CookiesAvailable`)
                      ? "text-graysuit"
                      : "text-topaz"
                  }`}
                >
                  {t("disabled")}
                </p>
                <Switch
                  disabled={cookieType === "Necessary"}
                  checked={eval(`is${cookieType}CookiesAvailable`)}
                  aria-readonly={cookieType === "Necessary"}
                  aria-checked={
                    cookieType !== "Necessary" &&
                    eval(`is${cookieType}CookiesAvailable`)
                  }
                  onCheckedChange={() =>
                    eval(
                      `setIs${cookieType}CookiesAvailable(is${cookieType}CookiesAvailable => !is${cookieType}CookiesAvailable)`,
                    )
                  }
                  aria-details={`${cookieType} cookies consent switch`}
                />
                <p
                  className={`text-xs !mb-0 ${
                    eval(`is${cookieType}CookiesAvailable`)
                      ? "text-topaz"
                      : "text-graysuit"
                  }`}
                >
                  {t("enabled")}
                </p>
              </div>
            )}
          </>
        ),
        content: (
          <>
            <p>{t(`cookies-${cookieType.toLocaleLowerCase()}-description`)}</p>
            {getCookiesTable(cookieType)}
          </>
        ),
      };
    });
  };

  if (isConsentDateAvailable) {
    return (
      <div className="fixed left-1 bottom-1 rounded-full overflow-hidden z-50">
        <Button
          variant="tertiary"
          size="sm"
          onClick={() => setIsConsentDateAvailable(false)}
          aria-label="Open cookie settings"
          tabIndex={0}
        >
          <CookiesIcon
            aria-hidden="true"
            aria-details="cookies settings page"
            className="h-8 w-8 opacity-50"
          />
        </Button>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsConsentDateAvailable(true)}
      className="fixed left-0 right-0 top-0 bottom-0 bg-background/90 backdrop-blur-sm z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col justify-between bg-background border-foreground/30 border rounded-md shadow-md mx-4 sm:mx-auto sm:max-w-5xl max-h-[600px] my-10 fixed bottom-0 left-0 right-0 z-40 p-2 sm:p-4 transition-transform duration-200"
      >
        <nav className="flex justify-between items-center">
          {headings.map((heading) => {
            return (
              <div
                key={heading}
                className="w-3/6 px-2 py-4 text-center"
                onClick={() => setCurrentMenu(heading.toLowerCase())}
              >
                <span
                  className={`${
                    currentMenu === heading.toLowerCase() ? "text-main" : ""
                  }`}
                >
                  {t(`cookies-${heading.toLowerCase()}-tab`)}
                </span>
              </div>
            );
          })}
        </nav>
        <div
          className={`min-h-[350px] sm:min-h-[250px] ${
            currentMenu === "consent" ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg mb-2">{t("cookies-title")}</h2>
          <p>{t("cookies-message")}</p>
        </div>
        <div
          className={`${
            currentMenu === "preferences" ? "block" : "hidden"
          } w-full [height:_clamp(140px,340px,440px)] sm:[height:_clamp(180px,380px,480px)] mb-4 overflow-auto`}
        >
          <Accordion items={getAccordionItems()} />
        </div>
        <div className="text-xs flex md:flex-row flex-col gap-2 sm:gap-4 w-full items-start ">
          {mainButtons()}
          {preferencesButtons()}
        </div>
      </div>
    </div>
  );
};

export default Cookies;

interface CookiesButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void;
}

const CookiesButton = ({ children, onClick }: CookiesButtonProps) => {
  return (
    <Button variant="secondary" size="sm" onClick={() => onClick()}>
      {children}
    </Button>
  );
};
