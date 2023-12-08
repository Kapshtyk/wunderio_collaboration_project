import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";

interface MatomoProps {
  MATOMO_URL: string;
  MATOMO_CONTAINER: string;
}

const Matomo = ({ MATOMO_URL, MATOMO_CONTAINER }: MatomoProps) => {
  const router = useRouter();

  useEffect(() => {
    if (window._paq) {
      window._paq.push(["setCustomUrl", router.asPath]);
      window._paq.push(["trackPageView"]);
    }
  }, [router.asPath]);

  return (
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['requireCookieConsent']);
          var _mtm = window._mtm = window._mtm || [];
          _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
          (function() {
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/${MATOMO_URL}/container_${MATOMO_CONTAINER}.js'; s.parentNode.insertBefore(g,s);
          })();
       `,
      }}
    />
  );
};

export default Matomo;
