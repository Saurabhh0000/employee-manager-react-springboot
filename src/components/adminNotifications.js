// src/utils/adminNotifications.js
export const addAdminNotification = (message) => {
  const existing =
    JSON.parse(localStorage.getItem("adminNotifications")) || [];

  const newNotification = {
    message,
    read: false,
    time: new Date().toISOString(),
  };

  existing.unshift(newNotification); // newest on top

  localStorage.setItem(
    "adminNotifications",
    JSON.stringify(existing)
  );

  // 🔥 notify header immediately (important)
  window.dispatchEvent(new Event("admin-notification"));
};
