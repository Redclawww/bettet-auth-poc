import {
  CreateTodoObject,
  getTodosFromFile,
  writeTodosToFile,
} from "@/lib/helperFunctions";
import { Todo } from "../ctypes";
import { ITodoApi } from "../ctypes";

export class FileJsonTodoApi implements ITodoApi {
  async getTodos(): Promise<Array<Todo>> {
    let todos = getTodosFromFile();
    return todos;
  }

  async addTodo(text: string): Promise<Todo> {
    let todos = getTodosFromFile();
    const newTodoItem: Todo = CreateTodoObject(text);
    todos.push(newTodoItem);
    writeTodosToFile(todos);
    return newTodoItem;
  }

  async deleteTodo(id: number): Promise<{ id: number }> {
    let todos = getTodosFromFile();
    todos = todos.filter(
      (todo: { id: Number | null }) => todo.id !== Number(id)
    );
    writeTodosToFile(todos);
    return { id: id };
  }

  async markTodoComplete(id: number): Promise<Todo> {
    let todos = getTodosFromFile();
    const todoIndex = todos.findIndex(
      (todo: { id: Number | null }) => todo.id === id
    );
    todos[todoIndex].completed = !todos[todoIndex].completed;
    writeTodosToFile(todos);
    return todos[todoIndex];
  }
}
