import { PromptGrid } from "@/components/prompt/prompt-grid";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { getTranslations } from "next-intl/server";

export default async function PromptsPage() {
  const session = await auth();
  const t = await getTranslations("prompt");

  // Fetch all prompts
  const prompts = await api.prompt.getAll();

  // Fetch user's prompts if authenticated
  const myPrompts = session ? await api.prompt.getMine() : [];

  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{t("browseAll")}</h1>
        <p className="text-gray-600 mb-6">{t("sharePrompt")}</p>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold">{t("browseAll")}</h2>
          </div>

          <PromptGrid prompts={prompts} />
        </div>

        {session && (
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-semibold">{t("myPrompts")}</h2>
            </div>

            <PromptGrid
              prompts={myPrompts}
              emptyMessage={t("createYourFirst")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
