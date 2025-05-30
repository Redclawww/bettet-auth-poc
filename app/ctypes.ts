import { ObjectId } from "mongodb";

export type DbType = "FILE" | "MONGODB";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  userId: string | ObjectId;
};

export type TodoMdb = {
  _id: ObjectId;
  text: string;
  completed: boolean;
  userId: string;
};

export function convertTodoToMdb(todo: Todo): TodoMdb {
  return {
    _id: new ObjectId(todo.id),
    text: todo.text,
    completed: todo.completed,
    userId: todo.userId as string,
  };
}

export function convertTodoFromMdb(todo: TodoMdb): Todo {
  return {
    id: todo._id.toString(),
    text: todo.text,
    completed: todo.completed,
    userId: todo.userId,
  };
}

export interface ITodoApi {
  getTodos(userId: string): Promise<Array<Todo>>;
  addTodo(text: string, userId: string): Promise<Todo>;
  deleteTodo(
    id: string,
    userId: string
  ): Promise<{
    id: number;
  }>;
  markTodoComplete(id: string, userId: string): Promise<Todo>;
}
