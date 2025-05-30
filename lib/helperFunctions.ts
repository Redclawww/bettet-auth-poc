import { Todo } from "@/app/ctypes";
import { FileHelper } from "./fileHelper";
import { SEED_NUMBER } from "@/app/_dal/constants";

export function getTodosFromFile() {
  const file = FileHelper.getFile();
  let data = JSON.parse(file);
  return data.todos;
}

export function writeTodosToFile(todos: Todo) {
  FileHelper.writeToFile(JSON.stringify({ todos: todos }));
}

export function CreateTodoObject(text: string, userId: string) {
  const randomId = Math.floor(Math.random() * SEED_NUMBER);
  const newTodoItem: Todo = {
    id: randomId,
    text: text,
    completed: false,
    userId: userId,
  };
  return newTodoItem;
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
