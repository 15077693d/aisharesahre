import { redirect } from "@/i18n/navigation";
import { auth } from "@/server/auth";
import { SignIn } from "./_components";
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  const { locale } = await params;

  if (session) {
    return redirect({ href: "/", locale });
  }
  return <SignIn />;
}
