"use client";
import { CheckIcon } from "@/components/CheckIcon";
import React, { useEffect, useState } from "react";
import { Todo } from "../ctypes";

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const todos = localStorage.getItem("todos");
    if (todos) {
      setTodos(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-2 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center">
              {
                todo.completed && <CheckIcon />
              }
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
              {
                !todo.completed && (
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className="bg-green-500 hover:bg-green-700 0 px-3 py-2 rounded-lg"
                  >
                   <CheckIcon />
                  </button>
                )
              }
            </div>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No Todos. Add a new Todo !
        </p>
      )}
    </div>
  );
};

export default TodoApp;
