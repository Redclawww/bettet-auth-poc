import { dbConnect } from "@/lib/mongoDb";
import { convertTodoFromMdb, Todo, TodoMdb } from "../ctypes";
import { ITodoApi } from "../ctypes";
import { CreateTodoObject } from "@/lib/helperFunctions";
import { ObjectId } from "mongodb";

export class MongoDbTodoApi implements ITodoApi {
  async getTodos(userId: string): Promise<Array<Todo>> {
    const db = await dbConnect();
    try {
      console.log("Fetching todos for userId:", userId);
      const todos = await db
        .collection<TodoMdb>("todos")
        .find({ userId: userId })
        .toArray();

      if (!todos) {
        return [];
      }

      return todos.map(convertTodoFromMdb);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch todos from MongoDB");
    }
  }

  async addTodo(text: string, userId: string): Promise<Todo> {
    const db = await dbConnect();
    try {
      const newTodo: Todo = CreateTodoObject(text, userId);
      const user = await db.collection<TodoMdb>("todos").insertOne(newTodo);
      if (!user) {
        throw new Error("todo is not added to MongoDB");
      }
      return {
        ...newTodo,
        id: user.insertedId.toString(),
      };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to add todo to MongoDB");
    }
  }

  async deleteTodo(id: string, userId: string): Promise<{ id: string }> {
    const db = await dbConnect();
    try {
      const deletedTodo = await db
        .collection<TodoMdb>("todos")
        .findOneAndDelete({
          userId: userId,
          _id: new ObjectId(id.toString()),
        });
      if (!deletedTodo) {
        throw new Error("Todo not deleted or not found");
      }
      return { id: deletedTodo._id.toString() };
    } catch (error) {
      console.log(error);
      throw new Error("Failed to delete todo from MongoDB");
    }
  }

  async markTodoComplete(id: string, userId: string): Promise<Todo> {
    const db = await dbConnect();
    try {
      const todo = await db
        .collection<TodoMdb>("todos")
        .findOne({ _id: new ObjectId(id.toString()), userId: userId });
      if (!todo) {
        throw new Error("Todo not found");
      }
      todo.completed = !todo.completed;
      const updatedTodo = await db
        .collection<TodoMdb>("todos")
        .findOneAndUpdate(
          { _id: new ObjectId(id), userId: userId },
          { $set: { completed: todo.completed } },
          { returnDocument: "after" }
        );
      if (!updatedTodo) {
        throw new Error("Failed to update todo in MongoDB");
      }
      return convertTodoFromMdb(updatedTodo);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to mark todo as complete in MongoDB");
    }
  }
}
