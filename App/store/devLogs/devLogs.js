import create from "zustand";

const MAX_LOGS = 1000; // Keep last 1000 logs

export default create((set, get) => ({
  logs: [],

  addLog: (level, message) => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const newLog = {
      id: Date.now() + Math.random(),
      timestamp,
      level,
      message,
    };

    set((state) => {
      const newLogs = [...state.logs, newLog];
      // Keep only the last MAX_LOGS entries
      if (newLogs.length > MAX_LOGS) {
        return { logs: newLogs.slice(-MAX_LOGS) };
      }
      return { logs: newLogs };
    });
  },

  clearLogs: () => set({ logs: [] }),
}));
