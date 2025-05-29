export type DbType = "FILE" | "MONGODB";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export interface ITodoApi {
  getTodos(): Promise<Array<Todo>>;
  addTodo(text: string): Promise<Todo>;
  deleteTodo(id: number): Promise<{
    id: number;
  }>;
  markTodoComplete(id: number): Promise<Todo>;
}
