"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex h-[calc(100svh-80px)] flex-col items-center justify-center gap-4">
      <h2 className="text-3xl font-bold">{t("error.title")}</h2>
      <p className="text-muted-foreground">{t("error.description")}</p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="outline">
          {t("error.tryAgain")}
        </Button>
        <Button asChild>
          <Link href="/">{t("error.returnHome")}</Link>
        </Button>
      </div>
    </div>
  );
}
