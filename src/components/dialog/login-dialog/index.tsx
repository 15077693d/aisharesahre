"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface LoginDialogProps {
  open: boolean;
  onSubmitSuccess?: () => Promise<void>;
  hideCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
  redirectTo?: string;
}

// Define the schema for login validation
const loginSchema = z.object({
  email: z.string().email("schema.auth.invalidEmail"),
  password: z.string().min(1, "schema.auth.passwordRequired"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
const socialProviders = [
  {
    id: "google",
    name: "auth.google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27026 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
          fill="#EA4335"
        />
        <path
          d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
          fill="#4285F4"
        />
        <path
          d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
          fill="#FBBC05"
        />
        <path
          d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.2154 17.14 5.2704 14.295L1.27539 17.39C3.25539 21.31 7.3104 24 12.0004 24Z"
          fill="#34A853"
        />
      </svg>
    ),
  },
  {
    id: "github",
    name: "auth.github",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
    ),
  },
  // {
  //   id: "discord",
  //   name: "auth.discord",
  //   icon: (
  //     <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
  //       <path
  //         fill="#5865F2"
  //         d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.127a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"
  //       />
  //     </svg>
  //   ),
  // },
];
export function LoginDialog({
  open,
  onSubmitSuccess,
  hideCloseButton = false,
  onOpenChange,
  redirectTo,
}: LoginDialogProps) {
  const t = useTranslations();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;
  async function onSubmit(data: LoginFormValues) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirectTo: redirectTo,
      });
      if (result?.error) {
        // Set a form error instead of throwing
        form.setError("root", {
          type: "manual",
          message: t("auth.invalidCredentials"),
        });
        return;
      } else {
        // Login successful
        await onSubmitSuccess?.();
      }
    } catch (error) {
      // Handle any other errors
      form.setError("root", {
        type: "manual",
        message: t("auth.signInError"),
      });
      console.error("Login error:", error);
    }
  }

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    void signIn(provider, {
      redirectTo: redirectTo,
    });
    // We need to listen for the callback response
    // This will be handled by the onSubmitSuccess callback when auth is complete
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton={hideCloseButton} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("navigation.signIn")}</DialogTitle>
          <DialogDescription>{t("common.signInRequired")}</DialogDescription>
        </DialogHeader>
        {process.env.NEXT_PUBLIC_VERCEL_ENV === "development" && (
          <>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("🚀 ~ errors:", errors);
                })}
                className="space-y-4"
              >
                {formState.errors.root && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                    {formState.errors?.root?.message}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.email")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("auth.emailPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t("auth.passwordPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-2">
                  <Button type="submit" isLoading={isSubmitting}>
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("navigation.signIn")}
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}

        <div className="flex flex-col gap-2">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="flex-1"
              onClick={() => handleSocialLogin(provider.id)}
              type="button"
            >
              {provider.icon}
              {t(provider.name)}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
