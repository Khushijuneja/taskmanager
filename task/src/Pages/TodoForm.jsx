import React, { useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { Input, Button } from "antd";
import "antd/dist/antd.css";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const handleAddTask = () => {
    if (task.trim()) {
      addTask(task);
      setTask(""); // Reset the input after adding
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Add a New Task</h2>
      <Input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        className="mb-4"
      />
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default TodoForm; // Ensure correct export
