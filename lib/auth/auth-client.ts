import { createAuthClient } from "better-auth/react";
export const {
  signIn,
  signOut,
  useSession,
  resetPassword,
  forgetPassword,
  deleteUser,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
