import React, { useState } from 'react';
import { TodoItem } from './TodoItem';
import { FilterType } from '../types/todo';
import { useTodos } from '../hooks/useTodos';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const { todos, filter, setFilter, addTodo, toggleTodo, updateTodo, deleteTodo } = useTodos();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const filterButtons: { type: FilterType; label: string }[] = [
    { type: 'all', label: 'All' },
    { type: 'completed', label: 'Completed' },
    { type: 'incomplete', label: 'Incomplete' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Todo List</h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        <div className="flex gap-2 mb-6">
          {filterButtons.map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg ${
                filter === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 