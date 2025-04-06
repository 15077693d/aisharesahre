"use client";
import { Link } from "@/i18n/navigation";
import { DialogId, useDialogStore } from "@/lib/stores/useDialogStore";
import { Github, Plus, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SharePromptDialog } from "../dialog/share-prompt-dialog";
import { AvatarDropdown } from "../dropdown/avatar-dropdown";
import { LanguageDropdown } from "../dropdown/language-dropdown";
import { Button } from "../ui/button";

export function Navbar() {
  const t = useTranslations();
  const { openDialog, dialogs, onOpenChange } = useDialogStore();
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Share2 className="h-6 w-6 text-purple-600" />
              <h1 className="text-md font-bold text-gray-900 sm:text-2xl">
                AIShareShare
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-4 mr-4">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t("navigation.home")}
                </Link>
                <Link
                  href="/prompts"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t("prompt.browseAll")}
                </Link>
              </nav>
              <div className="flex items-center gap-2">
                <LanguageDropdown />
                <AvatarDropdown />
                <Button
                  variant="default"
                  onClick={() => openDialog(DialogId.SHARE_PROMPT)}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="hidden sm:block">
                    {t("navigation.sharePrompt")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Buy Me a Coffee Banner */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="https://github.com/15077693d/aisharesahre"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 text-gray-800 hover:text-gray-900 transition-colors"
            >
              <Github className="h-4 w-4 md:h-5 md:w-5" />
              <span className="text-sm md:text-base font-medium">
                {t("navigation.contributeGithub")}
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Share Prompt Dialog */}
      <SharePromptDialog
        open={dialogs[DialogId.SHARE_PROMPT].isOpen}
        onOpenChange={(open) => onOpenChange(DialogId.SHARE_PROMPT, open)}
      />
    </>
  );
}
