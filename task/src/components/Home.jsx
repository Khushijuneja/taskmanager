import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to Task Manager</h1>
      <Link to="/tasks">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Go to Task Manager
        </button>
      </Link>
    </div>
  );
};

export default Home;
