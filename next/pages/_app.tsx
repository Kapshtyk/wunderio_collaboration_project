import "@/styles/globals.css";

import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Cookies from "@/components/cookies";
import { Layout } from "@/components/layout";
import Matomo from "@/components/matomo";
import {
  LanguageLinks,
  LanguageLinksProvider,
} from "@/lib/contexts/language-links-context";
import { CommonPageProps } from "@/lib/get-common-page-props";
import { inter, overpass } from "@/styles/fonts";

import { env } from "@/env";

interface PageProps extends CommonPageProps {
  languageLinks?: LanguageLinks;
  session?: Session;
}
function App({ Component, pageProps }: AppProps<PageProps>) {
  const [queryClient] = useState(() => new QueryClient());
  const { menus, languageLinks, session, ...restPageProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Fonts>
          <LanguageLinksProvider languageLinks={languageLinks}>
            <Layout menus={menus}>
              <Matomo
                MATOMO_URL={env.NEXT_PUBLIC_MATOMO_URL}
                MATOMO_CONTAINER={env.NEXT_PUBLIC_MATOMO_CONTAINER_ID}
              />
              <Component {...restPageProps} />
              <Cookies />
            </Layout>
          </LanguageLinksProvider>
        </Fonts>
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${overpass.className} ${inter.className} font-overpass antialiased`}
    >
      {children}
    </div>
  );
}

export default appWithTranslation(App);
