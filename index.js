// index.js

const Storage = {
  // Save an item with optional expiration (in minutes)
  set(key, value, expirationMinutes = null) {
    try {
      const item = {
        value: value,
        expiry: expirationMinutes ? new Date().getTime() + expirationMinutes * 60 * 1000 : null
      };
      localStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage", error);
      return false;
    }
  },

  // Retrieve an item, automatically parsing JSON and checking expiration
  get(key) {
    try {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      
      // Check if expired
      if (item.expiry && new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return null;
    }
  },

  // Remove an item
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Error removing from localStorage", error);
      return false;
    }
  }
};

module.exports = Storage;