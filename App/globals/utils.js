import * as Device from "expo-device";

export const pickByPlatform = ({ android, ios }) =>
  Device.osName === "iOS" || Device.osName === "iPadOS" ? ios : android;

/**
 * Creates a Date object from event date and entrance time
 * @param {string} eventDate - Event date (e.g., "2025-01-15")
 * @param {string} eventInTime - Entrance time (e.g., "18:00")
 * @returns {Date} Date object
 */
export const createEventDate = (eventDate, eventInTime) => {
  return new Date(`${eventDate}T${eventInTime}`);
};

/**
 * Creates an ISO string from event date and entrance time
 * @param {string} eventDate - Event date (e.g., "2025-01-15")
 * @param {string} eventInTime - Entrance time (e.g., "18:00")
 * @returns {string} ISO date-time string
 */
export const getEventDateTime = (eventDate, eventInTime) => {
  return createEventDate(eventDate, eventInTime).toISOString();
};

/**
 * Formats minutes into a human-readable time string
 * @param {number} totalMinutes - Total minutes to format
 * @returns {Object} - { days, hours, minutes, formatted }
 */
export const formatMinutesToReadableTime = (totalMinutes) => {
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  const parts = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);

  return {
    days,
    hours,
    minutes,
    formatted: parts.join(" and ") || "0 minutes",
  };
};

/**
 * Formats a Date object to HH:MM string
 * @param {Date} date - Date object to format
 * @returns {string} Time in HH:MM format
 */
export const formatTimeHHMM = (date) => {
  if (!date || !(date instanceof Date)) {
    return "--:--";
  }
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
