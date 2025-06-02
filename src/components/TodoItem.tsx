import { useState } from 'react';
import { Todo } from '../types/todo';
import { FaTrash, FaCheck, FaEdit, FaSave } from 'react-icons/fa';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleUpdate = () => {
    if (editedTitle.trim() !== '') {
      onUpdate(todo.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="flex flex-col p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={() => onToggle(todo.id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
              ${todo.completed 
                ? 'border-green-500 bg-green-500 text-white' 
                : 'border-gray-400 dark:border-gray-600'
              }`}
          >
            {todo.completed && <FaCheck className="w-3 h-3" />}
          </button>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1 p-1 rounded border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
            />
          ) : (
            <span className={`text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through' : ''}`}>
              {todo.title}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => isEditing ? handleUpdate() : setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isEditing ? <FaSave /> : <FaEdit />}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Created: {formatDate(todo.createdAt)}
      </div>
    </div>
  );
}; 