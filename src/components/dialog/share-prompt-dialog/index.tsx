"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoginDialog } from "../login-dialog";

interface SharePromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SharePromptDialog({
  open,
  onOpenChange,
}: SharePromptDialogProps) {
  const t = useTranslations();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  // Show login dialog if user is not authenticated
  const [showLoginDialog, setShowLoginDialog] = useState(
    !isAuthenticated && open,
  );

  useEffect(() => {
    if (open && !isAuthenticated) {
      setShowLoginDialog(true);
    } else {
      setShowLoginDialog(false);
    }
  }, [open, isAuthenticated]);

  // Define schema for prompt validation
  const promptSchema = z.object({
    title: z
      .string()
      .min(1, t("prompt.title") + " " + t("auth.invalidCredentials")),
    aiTool: z
      .string()
      .min(1, t("prompt.aiTool") + " " + t("auth.invalidCredentials")),
    content: z
      .string()
      .min(1, t("prompt.content") + " " + t("auth.invalidCredentials")),
  });

  type PromptFormValues = z.infer<typeof promptSchema>;

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: "",
      aiTool: "",
      content: "",
    },
  });

  // API mutation for creating a prompt
  const createPrompt = api.prompt.create.useMutation({
    onSuccess: () => {
      toast.success(t("prompt.promptSaved"));
      form.reset();
      onOpenChange(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(t("error.title"), {
        description: error.message,
      });
    },
  });

  async function onSubmit(data: PromptFormValues) {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    await createPrompt.mutateAsync({
      title: data.title,
      aiTool: data.aiTool,
      content: data.content,
    });
  }

  const { formState } = form;
  const { isSubmitting } = formState;

  // Handle login success
  const handleLoginSuccess = async () => {
    setShowLoginDialog(false);
    return Promise.resolve();
  };

  // Prevent dialog from closing when login dialog is shown
  const handleOpenChange = (newOpen: boolean) => {
    if (showLoginDialog && !newOpen) {
      setShowLoginDialog(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t("prompt.sharePrompt")}</DialogTitle>
            <DialogDescription>{t("prompt.create")}</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("prompt.title")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("prompt.titlePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="aiTool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("prompt.aiTool")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("prompt.aiToolPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("prompt.content")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("prompt.contentPlaceholder")}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  {t("prompt.cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || createPrompt.isPending}
                >
                  {t("prompt.save")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Login dialog if user is not authenticated */}
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        onSubmitSuccess={handleLoginSuccess}
      />
    </>
  );
}
