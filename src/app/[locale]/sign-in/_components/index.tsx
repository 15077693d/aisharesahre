"use client";
import { LoginDialog } from "~/components/dialog/login-dialog";

export function SignIn() {
  return <LoginDialog hideCloseButton open={true} redirectTo="/" />;
}
