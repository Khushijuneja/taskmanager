import { create } from "zustand";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompleted,
} from "../utils/api.js";

export const useTaskStore = create((set) => ({
  tasks: [],

  // Fetch all tasks from the backend
  fetchTasks: async () => {
    try {
      const tasksFromBackend = await getTasks();
      set({ tasks: tasksFromBackend });
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  },

  // Add a new task
  addTask: async (text) => {
    try {
      const newTask = await createTask(text);
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error("Failed to add task", error);
    }
  },

  // Toggle completion status
  toggleTask: async (id) => {
    try {
      const updatedTask = await toggleTaskCompleted(id);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      console.error("Failed to toggle task", error);
    }
  },

  // Delete a task
  deleteTask: async (id) => {
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  },

  // Update a task title
  updateTask: async (id, newText) => {
    try {
      const updatedTask = await updateTask(id, newText);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      console.error("Failed to update task", error);
    }
  },
}));
