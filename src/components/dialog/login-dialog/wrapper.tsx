"use client";

import { useRouter } from "@/i18n/navigation";
import { DialogId, useDialogStore } from "@/lib/stores/useDialogStore";
import { LoginDialog } from ".";

export function LoginDialogWrapper() {
  const { dialogs, setDialogDisableClose, closeDialog } = useDialogStore();
  const router = useRouter();

  const handleSuccess = async () => {
    // Close the dialog after successful login
    closeDialog(DialogId.LOGIN);
    setDialogDisableClose(DialogId.LOGIN, false);
    // If we're on a protected route that redirected to login, we need to refresh
    // the current page to get the authenticated content
    router.refresh();
  };

  return (
    <LoginDialog
      hideCloseButton={dialogs[DialogId.LOGIN].disableClose}
      open={dialogs[DialogId.LOGIN].isOpen}
      onSubmitSuccess={handleSuccess}
      onOpenChange={(open) => {
        if (!open) {
          closeDialog(DialogId.LOGIN);
        }
      }}
    />
  );
}
