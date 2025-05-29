"use client";
import React, { useEffect, useState } from "react";
import { CheckIcon } from "@/components/CheckIcon";
import { Todo } from "../ctypes";

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setLoading(true);
        const result = await fetch("/api/todos", {
          method: "GET",
        });
        const data = await result.json();
        setTodos(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchTodos();
  }, []);

  async function handleAddTodo() {
    try {
      const result = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text: inputValue }),
      });
      const data = await result.json();
      setTodos([...(todos || []), data.newTodo]);
      setInputValue("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      const result = await fetch(`/api/todos`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      const data = await result.json();
      if (data.deletedTodoId.id === id) {
        const newTodos = todos?.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleToggleComplete(id: number) {
    try {
      const result = await fetch(`/api/todos`, {
        method: "PATCH",
        body: JSON.stringify({ id: id }),
      });
      const data = await result.json();
      if (data.PatchedTodoId.id === id) {
        setTodos(
          todos?.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-gray-700">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <div className="flex mb-4 gap-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="Enter a new task"
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul>
        {loading ? (
          <div>
            <p>Loading Todos</p>
          </div>
        ) : (
          todos?.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-2 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center">
                {todo.completed && <CheckIcon />}
                <span
                  className={`${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>
              <div className="flex gap-2 text-white">
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 bg:text-red-700  px-3 py-2 rounded-lg"
                >
                  Delete
                </button>
                {!todo.completed && (
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className="bg-green-500 hover:bg-green-700 0 px-3 py-2 rounded-lg"
                  >
                    <CheckIcon />
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>

      {todos?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No Todos. Add a new Todo !
        </p>
      )}
    </div>
  );
};

export default Page;
