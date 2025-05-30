"use client";
import { resetPassword } from "@/lib/auth/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessage("Invalid or expired token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await resetPassword({
        token,
        newPassword: password,
      });

      if (error) {
        setMessage("Failed to reset password. Please try again.");
      } else {
        setMessage("Password reset successfully. You can now log in.");
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        className="border p-2 rounded mb-4 w-80"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        minLength={8}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-80"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Reset Password"}
      </button>
      {message && (
        <p
          className={`mt-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
