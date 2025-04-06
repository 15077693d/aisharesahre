"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { HIDDEN_FOOTER_PREFIX } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const t = useTranslations("footer");
  const privacyLink = `/legal/privacy-policy`;
  const termsLink = `/legal/terms-of-service`;
  const cookieLink = `/legal/cookie-policy`;

  const pathname = usePathname();
  if (HIDDEN_FOOTER_PREFIX.some((prefix) => pathname.includes(prefix))) {
    return null;
  }
  return (
    <footer className="border-t  py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href={privacyLink} className="hover:underline">
              {t("privacyPolicy")}
            </Link>
            <Link href={termsLink} className="hover:underline">
              {t("termsOfService")}
            </Link>
            <Link href={cookieLink} className="hover:underline">
              {t("cookiePolicy")}
            </Link>
            <Link
              href="mailto:osacryiu.lap@gmail.com"
              className="hover:underline"
            >
              {t("contactUs")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
