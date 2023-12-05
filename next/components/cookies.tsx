import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";

import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { Button } from "@/ui/button";
import { Accordion } from "@/ui/accordion";
import { Switch } from "@/ui/switch";

import { useTranslation } from "next-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/table";
import { formatDate, getCurrentDateInMySqlFormat } from "@/lib/utils";
import { useRouter } from "next/router";

const Cookies = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [currentMenu, setCurrentMenu] = useState("consent");
  const [isClient, setIsClient] = useState(false);

  // All these booleans are using within eval() function
  const [isNecessaryCookiesAvailable, setIsNecessaryCookiesAvailable] = useState(true);
  const [isFunctionalCookiesAvailable, setIsFunctionalCookiesAvailable] = useState(false);
  const [isAnalyticsCookiesAvailable, setIsAnalyticsCookiesAvailable] = useState(false);
  const [isPerformanceCookiesAvailable, setIsPerformanceCookiesAvailable] = useState(false);
  const [isAdvertisingCookiesAvailable, setIsAdvertisingCookiesAvailable] = useState(false);

  const headings = ["Consent", "Preferences"];
  const cookiesTypes = ["Necessary", "Functional", "Analytics", "Performance", "Advertising"];

  useEffect(() => {
    setIsClient(true);
    const checkConsentCookie = () => {
      const consentCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('consentData='));
      if (consentCookie) {
        const jsonData = JSON.parse(consentCookie.split('consentData=')[1]);
        setIsFunctionalCookiesAvailable(jsonData.isFunctionalCookiesAvailable);
        setIsAnalyticsCookiesAvailable(jsonData.isAnalyticsCookiesAvailable);
        setIsPerformanceCookiesAvailable(jsonData.isPerformanceCookiesAvailable);
        setIsAdvertisingCookiesAvailable(jsonData.isAdvertisingCookiesAvailable);
      }
    };
    checkConsentCookie();
  }, [])

  const addToCookie = (consentData, id) => {
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
    const consentObject = { ...consentData, consentDate: formatDate(new Date().toDateString(), router.locale), isNecessaryCookiesAvailable: true };
    if (id) {
      consentObject.id = id;
    }
    const consentDataString = JSON.stringify(consentObject);
    document.cookie = `consentData=${consentDataString}; expires=${expirationDate.toUTCString()}; path=/`;
  };

  const handleAcceptCookies = async (type: string) => {
    let body;
    if (type === 'necessary') {
      body = {
        consentDate: getCurrentDateInMySqlFormat(),
      }
    } else if (type === 'all') {
      body = {
        isFunctionalCookiesAvailable: true,
        isAnalyticsCookiesAvailable: true,
        isPerformanceCookiesAvailable: true,
        isAdvertisingCookiesAvailable: true,
        consentDate: getCurrentDateInMySqlFormat(),
      }
    } else if (type === 'preferences') {
      body = {
        isFunctionalCookiesAvailable,
        isAnalyticsCookiesAvailable,
        isPerformanceCookiesAvailable,
        isAdvertisingCookiesAvailable,
        consentDate: getCurrentDateInMySqlFormat(),
      }
    }
    const response = await fetch("/api/cookies", {
      method: "POST",
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const result = await response.json()
      addToCookie(body, result.id);
    } else {
      addToCookie(body, null);
    }
  }

  const mainButtons = () => {
    return (
      <>
        <CookiesButton onClick={() => handleAcceptCookies('necessary')}>{t("cookies-necessary")}</CookiesButton>
        <CookiesButton onClick={() => handleAcceptCookies('all')}>{t("cookies-accept-all")}</CookiesButton>
      </>
    )
  }

  const preferencesButtons = () => {
    if (currentMenu === "consent") {
      return (
        <CookiesButton onClick={() => setCurrentMenu("preferences")}>
          {t("cookies-settings")}
          <ArrowIcon aria-hidden className="ml-1 h-6 w-6 -rotate-90" />
        </CookiesButton>
      )
    }
    if (currentMenu === "preferences") {
      return (
        <CookiesButton onClick={() => handleAcceptCookies('preferences')}>{t("cookies-save")}</CookiesButton>
      )
    }
    return null
  }

  const getTableRows = () => {
    let currentDate = new Date();
    let expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 6));
    return {
      'Necessary': [
        {
          title: 'consentData',
          description: "We set this cookie to remember users' consent preferences so that their preferences are respected on subsequent visits to this site. It does not collect or store any personal information about the site visitors.",
          expiration: formatDate(expirationDate.toDateString(), router.locale),
        }
      ],
      "Functional": [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expiration: formatDate(expirationDate.toDateString(), router.locale),
        }
      ],
      "Analytics": [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expiration: formatDate(expirationDate.toDateString(), router.locale),
        }
      ],
      "Performance": [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expiration: formatDate(expirationDate.toDateString(), router.locale),
        }
      ],
      "Advertising": [
        {
          title: t("cookies-table-title"),
          description: t("cookies-table-description"),
          expiration: formatDate(expirationDate.toDateString(), router.locale),
        }
      ],
    }
  }

  const getCookiesTable = (cookieType: string) => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{t("cookies-table-title")}</TableHead>
            <TableHead>{t("cookies-table-description")}</TableHead>
            <TableHead className="text-right w-[150px]">{t("cookies-table-expiration")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {getTableRows()[cookieType].map((row) => {
              return (
                <Fragment key={row.title}>
                  <TableCell className="w-[100px]">{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell className="text-right">{row.expiration}</TableCell>
                </Fragment>
              )
            }
            )}
          </TableRow>
        </TableBody>
      </Table>
    )
  }

  const getAccordionItems = () => {
    return cookiesTypes.map((cookieType) => {
      return {
        id: cookieType,
        heading: (
          <>
            <p>{t(`cookies-${cookieType.toLocaleLowerCase()}-title`)}</p>
            {isClient && (
              <div className="flex items-center gap-2 cursor-default" onClick={(e) => e.stopPropagation()}>
                <p className={`text-xs ${eval(`is${cookieType}CookiesAvailable`) ? 'text-graysuit' : "text-topaz"}`}>disabled</p>
                <Switch
                  disabled={cookieType === "Necessary"}
                  checked={eval(`is${cookieType}CookiesAvailable`)}
                  aria-readonly={cookieType === "Necessary"}
                  aria-checked={cookieType !== "Necessary" && eval(`is${cookieType}CookiesAvailable`)}
                  onCheckedChange={() => eval(`setIs${cookieType}CookiesAvailable(is${cookieType}CookiesAvailable => !is${cookieType}CookiesAvailable)`)}
                  aria-description={`${cookieType} cookies consent switch`}
                />
                <p className={`text-xs ${eval(`is${cookieType}CookiesAvailable`) ? 'text-topaz' : "text-graysuit"}`}>enabled</p>
              </div>
            )}
          </>
        ),
        content: (
          <>
            <p className="text-sm">
              {t(`cookies-${cookieType.toLocaleLowerCase()}-description`)}
            </p>
            {getCookiesTable(cookieType)}
          </>
        ),
      }
    })
  }

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 bg-white-30/90 backdrop-blur-sm z-40">
      <div className="bg-white rounded-md shadow-md mx-auto max-w-5xl max-h-[600px] my-10 fixed bottom-0 left-0 right-0 z-40 p-4 transition-transform duration-200">
        <nav className="flex justify-between items-center mb-6">
          {headings.map((heading) => {
            return (
              <div
                key={heading}
                className={`w-3/6 px-2 py-4 bg-mischka text-center border-b-2 ${currentMenu === heading.toLowerCase()
                  ? "border-gray-900"
                  : "border-mischka"
                  }`}
                onClick={(e) => setCurrentMenu(heading.toLowerCase())}
              >
                <span>{t(`cookies-${heading.toLowerCase()}-tab`)}</span>
              </div>
            );
          })}
        </nav>
        <div
          className={`min-h-[250px] ${currentMenu === "consent" ? "block" : "hidden"
            }`}
        >
          <h2 className="text-lg font-regular mb-2">
            {t("cookies-title")}
          </h2>
          <p>
            {t("cookies-message")}
          </p>
        </div>
        <div
          className={`${currentMenu === "preferences" ? "block" : "hidden"
            } w-full [height:_clamp(180px,380px,480px)] mb-16 overflow-auto`}
        >
          <Accordion items={getAccordionItems()} />
        </div>
        <div className="flex gap-4 absolute left-4 bottom-4">
          {mainButtons()}
          {preferencesButtons()}
        </div>
      </div>
    </div >
  );
};

export default Cookies;



interface CookiesButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void;
}

const CookiesButton = ({ children, onClick }: CookiesButtonProps) => {
  return (
    <Button variant="secondary" size="sm" onClick={(e) => onClick()}>
      {children}
    </Button>
  )
}