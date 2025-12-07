// app/page.js - Your main page
import TodoApp from './components/TodoApp';

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My App</h1>
      
      {/* Server-rendered content */}
      <p className="mb-6">
        Welcome to my app! Below is a client-side rendered todo app.
      </p>
      
      {/* CSR Component */}
      <TodoApp />
    </div>
  );
}