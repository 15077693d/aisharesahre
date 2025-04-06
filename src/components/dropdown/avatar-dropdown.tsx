"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogId, useDialogStore } from "@/lib/stores/useDialogStore";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function AvatarDropdown() {
  const session = useSession();
  const t = useTranslations();
  const { openDialog } = useDialogStore();

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
  };
  const userImage = useMemo(() => session?.data?.user?.image, [session]);
  // If user is not authenticated, render the sign in button instead
  if (session.status === "unauthenticated") {
    return (
      <Button
        variant="outline"
        className="md:inline-flex"
        onClick={() => openDialog(DialogId.LOGIN)}
      >
        {t("navigation.signIn")}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          {userImage && (
            <AvatarImage
              className="h-8 w-8"
              src={userImage}
              alt={t("navigation.userAvatar")}
            />
          )}
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{session?.data?.user?.name}</p>
            <p className="text-xs text-muted-foreground">
              {session?.data?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            className="w-full text-left cursor-pointer"
            onClick={handleSignOut}
          >
            {t("navigation.signOut")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
