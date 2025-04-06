"use client";
import { AvatarDropdown } from "@/components/dropdown/avatar-dropdown";
import { LanguageDropdown } from "@/components/dropdown/language-dropdown";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import { Link, usePathname } from "@/i18n/navigation";
import { HIDDEN_BANNER_PREFIX, HIDDEN_NAV_PREFIX } from "@/lib/constants";
import { useTranslations } from "next-intl";

export function Navbar() {
  const pathname = usePathname();
  const tNav = useTranslations("navigation");
  const tBanner = useTranslations("banner");
  const tCommon = useTranslations("common");
  if (HIDDEN_NAV_PREFIX.some((prefix) => pathname.includes(prefix))) {
    return null;
  }
  return (
    <>
      {/* Test version banner */}
      {!HIDDEN_BANNER_PREFIX.some((prefix) => pathname.includes(prefix)) && (
        <div className="bg-yellow-500 dark:bg-yellow-800 py-2 text-center text-sm text-black dark:text-white font-medium">
          {tBanner("testVersion")}
          <a
            href="mailto:oscaryiu.lapsang@gmail.com"
            className="underline ml-1"
          >
            {tBanner("contactEmail", { email: "oscaryiu.lapsang@gmail.com" })}
          </a>
        </div>
      )}
      <header className="bg-background narbar">
        <div className="container flex h-16 items-center justify-between px-4 m-auto">
          <div className="flex items-center gap-6 md:gap-10">
            <Link
              href="/"
              className="font-bold text-xl flex items-center gap-1"
            >
              {tCommon("appName")}
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href={"/"}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tNav("home")}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageDropdown />
            <AvatarDropdown />
          </div>
        </div>
      </header>
    </>
  );
}
