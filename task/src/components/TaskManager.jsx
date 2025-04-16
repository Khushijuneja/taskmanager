import React, { useState } from "react";
import TodoList from "../Pages/TodoList";

const TaskManager = () => {
  const [showManager, setShowManager] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6">
      {!showManager ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">
            Welcome to the Task Manager 📝
          </h1>
          <p className="mb-6 text-lg text-gray-700">
            Organize your tasks, stay productive!
          </p>
          <button
            onClick={() => setShowManager(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition"
          >
            Start Managing Tasks
          </button>
        </div>
      ) : (
        <TodoList />
      )}
    </div>
  );
};

export default TaskManager;
