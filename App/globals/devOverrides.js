import useDeveloper from "@store/developer/developer";

/**
 * Check if developer mode is active
 * @returns {boolean}
 */
export const isDevModeActive = () => {
  const { isDevMode } = useDeveloper.getState();
  return isDevMode;
};

/**
 * Get the effective event entrance time (with dev override if applicable)
 * @param {Object} event - The event object
 * @param {string} city - User's selected city
 * @returns {string} - The entrance time (HH:MM format)
 */
export const getEffectiveEventTime = (event, city) => {
  if (!event || !city) return null;

  const { isDevMode, eventTimeOverride } = useDeveloper.getState();

  // Return override if dev mode is on and override is set
  if (isDevMode && eventTimeOverride) {
    console.log(
      `🔧 DEV: Using override time ${eventTimeOverride} instead of ${
        event[`${city}_in`]
      }`
    );
    return eventTimeOverride;
  }

  // Return actual event time
  return event[`${city}_in`];
};

/**
 * Get the effective notification times (with dev override if applicable)
 * @param {Array<number>} userTimes - User's configured notification times
 * @returns {Array<number>} - The notification times in minutes
 */
export const getEffectiveNotificationTimes = (userTimes) => {
  const { isDevMode, notificationTestTimes } = useDeveloper.getState();

  // Return override if dev mode is on and override is set
  if (isDevMode && notificationTestTimes && notificationTestTimes.length > 0) {
    console.log(
      `🔧 DEV: Using override notification times [${notificationTestTimes.join(
        ", "
      )}] instead of [${userTimes.join(", ")}]`
    );
    return notificationTestTimes;
  }

  // Return user's configured times
  return userTimes;
};

/**
 * Get the effective event date (with dev override if applicable)
 * @param {Object} event - The event object
 * @returns {string} - The event date (YYYY-MM-DD format)
 */
export const getEffectiveEventDate = (event) => {
  if (!event) return null;

  const { isDevMode, eventDateOverride } = useDeveloper.getState();

  // Return override if dev mode is on and override is set
  if (isDevMode && eventDateOverride) {
    console.log(
      `🔧 DEV: Using override date ${eventDateOverride} instead of ${event.date}`
    );
    return eventDateOverride;
  }

  // Return actual event date
  return event.date;
};

/**
 * Check if any dev overrides are currently active
 * @returns {boolean} - True if any override is active
 */
export const hasAnyOverrides = () => {
  const {
    isDevMode,
    eventTimeOverride,
    eventDateOverride,
    notificationTestTimes,
  } = useDeveloper.getState();

  return (
    isDevMode &&
    (!!eventTimeOverride || !!eventDateOverride || !!notificationTestTimes)
  );
};

/**
 * Get all active overrides for display purposes
 * @returns {Object} - Object containing all active overrides
 */
export const getActiveOverrides = () => {
  const {
    isDevMode,
    eventTimeOverride,
    eventDateOverride,
    notificationTestTimes,
  } = useDeveloper.getState();

  return {
    isDevMode,
    eventTimeOverride,
    eventDateOverride,
    notificationTestTimes,
    hasOverrides: hasAnyOverrides(),
  };
};
