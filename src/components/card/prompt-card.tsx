"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Copy, Share2, Wand2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    aiTool: string;
    description: string;
    content: string;
    likes?: number;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    user?: {
      name?: string | null;
      image?: string | null;
    };
  };
}

export function PromptCard({ prompt }: PromptCardProps) {
  const t = useTranslations();
  const [isCopying, setIsCopying] = useState(false);

  const copyToClipboard = async () => {
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(prompt.content);
      toast.success(t("prompt.copied"));
    } catch (error) {
      toast.error(t("error.title"));
    } finally {
      setIsCopying(false);
    }
  };

  const handleSharePrompt = () => {
    if (navigator.share) {
      void navigator
        .share({
          title: prompt.title,
          text: `Check out this prompt: ${prompt.title}`,
          url: window.location.href,
        })
        .then(() => toast.success(t("prompt.sharedSuccessfully")))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      void navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success(t("prompt.linkCopied"));
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {prompt.title}
          </h2>
          <div className="flex items-center space-x-2">
            <Wand2 className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">{prompt.aiTool}</span>
          </div>
        </div>
        {/* <span  className="text-sm text-gray-500">❤️ {prompt.likes || 0}</span> */}
      </div>

      <p className="text-gray-600 mb-4">{prompt.description}</p>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <ScrollArea className="text-sm text-gray-700 max-h-[150px] overflow-y-auto whitespace-pre-wrap">
          {prompt.content}
        </ScrollArea>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {prompt.user?.name
            ? t("prompt.createdBy", { userName: prompt.user.name })
            : t("prompt.sharePrompt")}
        </span>
        <div className="flex space-x-4">
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            disabled={isCopying}
          >
            <Copy className="h-4 w-4" />
            <span>
              {isCopying ? t("prompt.copied") : t("prompt.copyToClipboard")}
            </span>
          </button>
          <button
            onClick={handleSharePrompt}
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-700"
          >
            <Share2 className="h-4 w-4" />
            <span>{t("prompt.share")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
