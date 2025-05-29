"use client";
import { signIn } from "@/lib/auth/auth-client";
import { Button } from "./ui/button";

export default function SignInSocial({
  provider,
  children,
}: {
  provider: "google" | "facebook";
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={async () => {
        await signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      }}
      type="button"
      variant={"outline"}
    >
      {children}
    </Button>
  );
}
