import React, { useEffect, useState } from "react";
import { useTaskStore } from "../store/useTaskStore";
import { List, Button, Input, Checkbox, Space, message } from "antd";

const TodoList = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedText, setEditedText] = useState("");

  // ✅ Fetch tasks once on component mount
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async () => {
    if (newTask.trim()) {
      await addTask(newTask.trim());
      setNewTask("");
      message.success("Task added!");
    } else {
      message.warning("Please enter a task before adding.");
    }
  };

  const handleSave = async (id) => {
    if (editedText.trim()) {
      await updateTask(id, editedText.trim());
      setEditId(null);
      setEditedText("");
      message.success("Task updated!");
    } else {
      message.warning("Task cannot be empty.");
    }
  };

  const handleToggleStatus = async (taskId) => {
    await toggleTask(taskId);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">📋 Task Manager</h2>

      {/* Add Task Input */}
      <div className="flex gap-2 mb-6">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <Button type="primary" onClick={handleAdd}>
          Add Task
        </Button>
      </div>

      {/* Task List */}
      <List
        bordered
        dataSource={tasks}
        locale={{ emptyText: "No tasks yet. Add one!" }}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            actions={[
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleStatus(task.id)}
              >
                {task.completed ? "Mark as Pending" : "Mark as Completed"}
              </Checkbox>,
              editId === task.id ? (
                <Space>
                  <Button type="primary" onClick={() => handleSave(task.id)}>
                    Save
                  </Button>
                  <Button onClick={() => setEditId(null)}>Cancel</Button>
                </Space>
              ) : (
                <Space>
                  <Button
                    onClick={() => {
                      setEditId(task.id);
                      setEditedText(task.title);
                    }}
                  >
                    Edit
                  </Button>
                  <Button danger onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </Space>
              ),
            ]}
          >
            {editId === task.id ? (
              <Input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
            ) : (
              <List.Item.Meta
                title={
                  <span
                    className={`${
                      task.completed ? "line-through text-green-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                }
                description={task.completed ? "✔️ Completed" : "⌛ Pending"}
              />
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
