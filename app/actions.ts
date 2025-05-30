"use server";
import { revalidatePath } from "next/cache";
import { FactoryApi } from "./_dal/factoryApi";
import { DbType } from "./ctypes";
import { headers } from "next/headers";
import { auth } from "@/lib/auth/auth";

const api = FactoryApi.getClass(process.env.DB_TYPE as DbType);

export async function getTodos(userId: string) {
  const data = await api.getTodos(userId);
  return data;
}

export async function addTodo(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User Not Authenticated");
  }

  const text = formData.get("todo") as string;
  await api.addTodo(text, session?.user.id);
  revalidatePath("/server-file-todo");
}

export async function deleteTodo(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("User Not Authenticated");
  }
  const id = formData.get("id") as string;
  await api.deleteTodo(id, session?.user.id);
  revalidatePath("/server-file-todo");
}

export async function MarkTodoComplete(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error("User Not Authenticated");
  }
  const id = formData.get("id") as string;
  await api.markTodoComplete(id, session?.user.id);
  revalidatePath("/server-file-todo");
}
