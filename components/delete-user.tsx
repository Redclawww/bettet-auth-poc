import { deleteUser } from "@/lib/auth/auth-client";
import { redirect } from "next/navigation";

export function DeleteUserButton() {
  const handleDelete = async () => {
    try {
      await deleteUser();
      alert("Your account has been deleted successfully.");
      redirect("/login");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(
        "There was an error deleting your account. Please try again later."
      );
    }
  };

  return (
    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
      Delete Account
    </button>
  );
}
