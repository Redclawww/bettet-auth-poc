"use server";

import { auth } from "./auth/auth";
import { redirect } from "next/navigation";
import { MongoClient } from "mongodb";
import { connectToDatabase } from "./db";
import { dbConnect } from "./mongoDb";

export async function signUp(formData: FormData) {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  const db = await dbConnect();
  console.log("Sign Up Action Triggered", formData);

  const rawFormdata = {
    email: formData.get("email") as string,
    firstName: formData.get("firstname") as string,
    lastName: formData.get("lastname") as string,
    password: formData.get("pwd") as string,
  };

  const { email, password, lastName, firstName } = rawFormdata;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
      },
    });
  } catch (error) {
    if (error) {
      //@ts-ignore
      switch (error.status) {
        case "UNPROCESSABLE_ENTITY":
          return { errorMessage: "User Already exists" };
          break;

        case "BAD_REQUEST":
          return { errorMessage: "Invalid email. Please check your input." };
          break;

        default:
          console.error("Unexpected error during sign up:", error);
          return {
            errorMessage: "An unexpected error occurred. Please try again.",
          };
      }
    }
    console.error("Error during sign up:", error);
    throw new Error("Sign up failed. Please try again.");
  }

  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const db = await dbConnect();
  console.log("Sign In Action Triggered", formData);

  const rawFormdata = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { email, password } = rawFormdata;

  try {
    await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });
  } catch (error) {
    console.error("Error during sign in:", error);
    throw new Error(
      "Sign in failed. Please check your credentials and try again."
    );
  }

  redirect("/dashboard");
}
