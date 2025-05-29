import { dbConnect } from "@/lib/mongoDb";
import { Todo } from "../ctypes";
import { ITodoApi } from "../ctypes";
import { CreateTodoObject } from "@/lib/helperFunctions";

export class MongoDbTodoApi implements ITodoApi {
  async getTodos(): Promise<Array<Todo>> {
    const db = await dbConnect();
    try {
      const todos = await db.collection<Todo>("todos").find().toArray();
      return todos;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch todos from MongoDB");
    }
  }

  async addTodo(text: string): Promise<Todo> {
    const db = await dbConnect();
    try {
      const newTodo: Todo = CreateTodoObject(text);
      const todo = await db.collection<Todo>("todos").insertOne(newTodo);
      if (!todo) {
        throw new Error("Failed to add todo to MongoDB");
      }

      return newTodo;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add todo to MongoDB");
    }
  }

  async deleteTodo(id: number): Promise<{ id: number }> {
    const db = await dbConnect();
    try {
      const deletedTodo = await db
        .collection<Todo>("todos")
        .findOneAndDelete({ id: id });
      if (!deletedTodo) {
        throw new Error("Todo not found");
      }
      return { id: deletedTodo.id };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete todo from MongoDB");
    }
  }

  async markTodoComplete(id: number): Promise<Todo> {
    const db = await dbConnect();
    try {
      const todo = await db.collection<Todo>("todos").findOne({ id: id });
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.completed = !todo.completed;
      const updatedTodo = await db
        .collection<Todo>("todos")
        .findOneAndUpdate(
          { id: id },
          { $set: { completed: todo.completed } },
          { returnDocument: "after" }
        );
      if (!updatedTodo) {
        throw new Error("Failed to update todo in MongoDB");
      }
      return updatedTodo;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to mark todo as complete in MongoDB");
    }
  }
}
