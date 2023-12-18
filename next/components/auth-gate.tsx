import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export function AuthGate({ children, text }: AuthGateProps) {
  const { t } = useTranslation();
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <section className="bg-accent-peach-fuzz/50 w-1/2 p-4 h-36 rounded-md">
      <h2>{t("you-are-not-logged-in")}</h2>
      <p className="text-md font-regular underline text-primary-500">
        <Link href={`/auth/login?callbackUrl=${encodeURI(router.asPath)}`}>
          {text}
        </Link>
      </p>
    </section>
  );
}
