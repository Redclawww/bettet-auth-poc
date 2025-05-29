"use server";
import { revalidatePath } from "next/cache";
import { FactoryApi } from "./_dal/factoryApi";
import { DbType } from "./ctypes";

const api = FactoryApi.getClass(process.env.DB_TYPE as DbType);

export async function getTodos() {
  const data = await api.getTodos();
  return data;
}

export async function addTodo(formData: FormData) {
  const text = formData.get("todo") as string;
  await api.addTodo(text);
  revalidatePath("/server-file-todo");
}

export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  await api.deleteTodo(id);
  revalidatePath("/server-file-todo");
}

export async function MarkTodoComplete(formData: FormData) {
  const id = Number(formData.get("id"));
  await api.markTodoComplete(id);
  revalidatePath("/server-file-todo");
}
