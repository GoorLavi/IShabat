import useDevLogs from "@store/devLogs/devLogs";

/**
 * Log to both console and dev logs store
 * @param {string} level - Log level: 'info', 'warn', 'error'
 * @param {string} message - Log message
 */
export const devLog = (level, message) => {
  // Log to console
  switch (level) {
    case "error":
      console.error(message);
      break;
    case "warn":
      console.warn(message);
      break;
    default:
      console.log(message);
  }

  // Add to dev logs store
  try {
    const { addLog } = useDevLogs.getState();
    addLog(level, message);
  } catch (error) {
    // Silently fail if store is not available
    console.error("Failed to add log to dev store:", error);
  }
};

export const devLogInfo = (message) => devLog("info", message);
export const devLogWarn = (message) => devLog("warn", message);
export const devLogError = (message) => devLog("error", message);
