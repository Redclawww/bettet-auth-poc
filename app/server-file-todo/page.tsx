import React, { Suspense } from "react";
import { addTodo, deleteTodo, getTodos, MarkTodoComplete } from "../actions";
import { CheckIcon } from "@/components/CheckIcon";
import { Todo } from "../ctypes";

export default async function Page() {
  const data = await getTodos();
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <form action={addTodo}>
        <div className="flex mb-4 gap-5">
          <input
            name="todo"
            type="text"
            placeholder="Enter a new task"
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <Suspense fallback={<p>Loading Todos</p>}>
        <ul>
          {data.map((todo: Todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center">
                {todo.completed && <CheckIcon />}
                <span
                  className={`${
                    todo.completed ? "line-through ml-2 text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2 text-white">
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button
                    className="bg-red-500 bg:text-red-700  px-3 py-2 rounded-lg"
                    type="submit"
                  >
                    Delete
                  </button>
                </form>
                {!todo.completed && (
                  <form action={MarkTodoComplete}>
                    <input type="hidden" name="id" value={todo.id} />
                    <button className="bg-green-500 hover:bg-green-700 0 px-3 py-2 rounded-lg">
                      <CheckIcon />
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Suspense>

      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No Todos. Add a new Todo !
        </p>
      )}
    </div>
  );
}
