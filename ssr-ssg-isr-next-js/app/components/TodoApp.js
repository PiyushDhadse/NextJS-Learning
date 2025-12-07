// app/components/TodoApp.js
"use client";

import { useState, useRef, useEffect } from 'react';

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem('todos');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  
  // Focus input on mount (browser-only)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  // Client-side handlers
  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      
      setTodos([...todos, newTodo]);
      setInput('');
      
      // Browser notification (if supported)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Todo Added!', {
          body: `Added: ${input.trim()}`,
        });
      }
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    // Play sound (browser-only)
    const audio = new Audio('/click.mp3');
    audio.play().catch(console.log);
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const clearAll = () => {
    if (window.confirm('Delete all todos?')) {
      setTodos([]);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Todo App (Pure CSR)</h2>
      
      {/* Input area */}
      <div className="flex gap-2 mb-6">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add
        </button>
      </div>
      
      {/* Todo list */}
      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No todos yet!</p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={`p-3 border rounded flex items-center justify-between ${
                todo.completed ? 'bg-gray-50 line-through' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5"
                />
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
      
      {/* Stats */}
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Total: {todos.length}</span>
        <span>Completed: {todos.filter(t => t.completed).length}</span>
        <button
          onClick={clearAll}
          className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Clear All
        </button>
      </div>
      
      {/* Browser features demo */}
      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-semibold mb-2">CSR Features Demo:</h3>
        <button
          onClick={() => {
            // Copy to clipboard (browser API)
            navigator.clipboard.writeText(JSON.stringify(todos, null, 2));
            alert('Copied to clipboard!');
          }}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
        >
          Copy Todos JSON
        </button>
        <p className="text-xs text-gray-500 mt-2">
          This entire component runs only in the browser
        </p>
      </div>
    </div>
  );
}