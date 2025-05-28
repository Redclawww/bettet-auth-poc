"use client";
import { resetPassword } from "@/lib/auth/auth-client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired token.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const { error } = await resetPassword({
      token,
      newPassword: password,
    });

    if (error) {
      setMessage("Failed to reset password. Please try again.");
      return;
    } else {
      setMessage("Password reset successfully. You can now log in.");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center h-screen"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4">Reset your Password</h1>
      <input
        type="password"
        placeholder="Enter new password"
        className="border p-2 rounded mb-4 w-80"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        className="border p-2 rounded mb-4 w-80"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-80" type="submit">
        Reset Password
      </button>
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </form>
  );
}
