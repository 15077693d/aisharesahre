"use client";

import { useTranslations } from "next-intl";
import { PromptCard } from "./prompt-card";

interface PromptGridProps {
  prompts: {
    id: string;
    title: string;
    aiTool: string;
    description: string;
    content: string;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    user?: {
      name?: string | null;
      image?: string | null;
    };
  }[];
  emptyMessage?: string;
}

export function PromptGrid({ prompts, emptyMessage }: PromptGridProps) {
  const t = useTranslations();

  if (prompts.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-gray-500">{emptyMessage || t("prompt.noPrompts")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  );
}
