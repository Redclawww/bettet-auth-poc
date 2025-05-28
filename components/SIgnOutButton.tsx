import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center justify-between cursor-pointer"
    >
      <img src="./logout.svg" className="size-10" />
      <p>Log Out</p>
    </div>
  );
}
