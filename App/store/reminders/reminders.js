import create from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default create(
  persist(
    (set, get) => ({
      todos: [],
      lastEventDateTime: null, // Track which event these todos belong to
      addTodo: (initialValue = "") => {
        const newTodo = {
          id: String.random(),
          value: initialValue,
          checked: false,
          isNew: initialValue === "",
        };
        set({
          todos: [...(get().todos || []), newTodo],
        });
        return newTodo;
      },
      setTodo: ({ isNew, ...todo }) => {
        set({
          todos: get().todos.map((t) => (t.id === todo.id ? todo : t)),
        });
      },
      removeTodo: (id) =>
        set({ todos: get().todos.filter((t) => t.id !== id) }),

      // Check if all todos are completed (checked)
      areAllCompleted: () => {
        const todos = get().todos;
        if (!todos || todos.length === 0) {
          return false; // No todos means not complete
        }
        return todos.every((t) => t.checked === true);
      },

      // Uncheck all todos for the next event
      uncheckAll: () => {
        const todos = get().todos;
        set({
          todos: todos.map((t) => ({ ...t, checked: false })),
        });
      },

      // Reset todos for next event
      resetForNextEvent: (eventDateTime) => {
        const currentEventDateTime = get().lastEventDateTime;
        if (currentEventDateTime !== eventDateTime) {
          get().uncheckAll();
          set({ lastEventDateTime: eventDateTime });
        }
      },
    }),
    {
      name: "todos",
      getStorage: () => AsyncStorage,
    }
  )
);
