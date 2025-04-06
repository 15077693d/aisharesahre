import { create } from "zustand";
import { devtools } from "zustand/middleware";
// First define an enum for all dialog types
export enum DialogId {
  LOGIN = "login",
  SIGNUP = "signup",
  SETTINGS = "settings",
  CONFIRMATION = "confirmation",
  // Add other dialogs as needed
}

// Then use the enum as the key type in your store
type DialogState = {
  isOpen: boolean;
  disableClose: boolean;
  // Additional dialog state properties
};

type DialogStore = {
  dialogs: Record<DialogId, DialogState>;
  openDialog: (dialogId: DialogId) => void;
  closeDialog: (dialogId: DialogId) => void;
  setDialogDisableClose: (dialogId: DialogId, disableClose: boolean) => void;
  // Other actions as needed
};

// Implementation with Zustand following t3-stack rules
export const useDialogStore = create<DialogStore>()(
  devtools(
    (set) => ({
      dialogs: {
        [DialogId.LOGIN]: { isOpen: false, disableClose: false },
        [DialogId.SIGNUP]: { isOpen: false, disableClose: false },
        // Initialize other dialogs with default state
      },

      openDialog: (dialogId) =>
        set(
          (state) => ({
            dialogs: {
              ...state.dialogs,
              [dialogId]: { ...state.dialogs[dialogId], isOpen: true },
            },
          }),
          false,
          "openDialog",
        ),

      closeDialog: (dialogId) =>
        set(
          (state) => ({
            dialogs: {
              ...state.dialogs,
              [dialogId]: { ...state.dialogs[dialogId], isOpen: false },
            },
          }),
          false,
          "closeDialog",
        ),

      setDialogDisableClose: (dialogId, disableClose) =>
        set(
          (state) => ({
            dialogs: {
              ...state.dialogs,
              [dialogId]: { ...state.dialogs[dialogId], disableClose },
            },
          }),
          false,
          "setDialogDisableClose",
        ),
    }),
    {
      name: "dialog-store", // Name for Redux DevTools
    },
  ),
);
