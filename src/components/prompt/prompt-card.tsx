"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface PromptCardProps {
  prompt: {
    id: string;
    title: string;
    aiTool: string;
    content: string;
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="line-clamp-1">{prompt.title}</CardTitle>
            <CardDescription>{prompt.aiTool}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={copyToClipboard}
            disabled={isCopying}
            title={t("prompt.copyToClipboard")}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="prose max-w-none dark:prose-invert">
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4">
            {prompt.content}
          </p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between items-center w-full text-xs text-gray-500">
          <span>
            {prompt.user?.name
              ? t("prompt.createdBy", { userName: prompt.user.name })
              : t("prompt.sharePrompt")}
          </span>
          <span>
            {prompt.createdAt &&
              new Date(prompt.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
