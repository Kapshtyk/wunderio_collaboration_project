import { GetStaticProps } from "next";

import CookiesComponent from "@/components/cookies";
import { createLanguageLinksForNextOnlyPage } from "@/lib/contexts/language-links-context";
import { getCommonPageProps } from "@/lib/get-common-page-props";

export default function Cookies() {
  return <CookiesComponent />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const languageLinks = createLanguageLinksForNextOnlyPage("/cookies", context);
  return {
    props: {
      ...(await getCommonPageProps(context)),
      languageLinks,
    },
    revalidate: 60,
  };
};
