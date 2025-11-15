/**
 * Get notification title and body message in Hebrew
 * @param {string} eventType - Event type ('שבת', 'חג', 'שבת חג')
 * @param {string} parasha - Parasha name
 * @param {number} minutesBefore - Minutes before event starts
 * @returns {Object} - { title, body }
 */
export const getNotificationMessage = (eventType, parasha, minutesBefore) => {
  const isShabat = eventType === "שבת" || eventType === "שבת חג";
  const isHoliday = eventType === "חג";

  // Title based on event type
  const title = isShabat ? "שבת שלום" : isHoliday ? "חג שמח" : "שבת שלום";

  // Event name for body
  const eventName = isShabat ? "שבת" : "חג";

  // Build body message
  let body = "";
  if (parasha) {
    body = `${eventName} ${parasha} `;
  } else {
    body = `${eventName} `;
  }
  body += `תיכנס בעוד ${minutesBefore} דקות`;

  console.log("body", body);

  return { title, body };
};

/**
 * Get time text in Hebrew for notification messages
 * @param {number} minutes - Minutes value
 * @returns {string} - Hebrew time text
 */
export const getTimeText = (minutes) => {
  if (minutes === 60) return "שעה";
  if (minutes === 30) return "חצי שעה";
  if (minutes === 40) return "40 דקות";
  if (minutes === 20) return "20 דקות";
  if (minutes === 2) return "2 דקות";
  if (minutes === 1) return "דקה";
  return `${minutes} דקות`;
};
