const STORAGE_KEY = 'neoredlabs_availability_bookings';
const memoryStore = {};

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

const canUseLocalStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const generateDailySlots = () => {
  const slots = [];
  const start = 9 * 60;
  const end = 17 * 60;
  for (let minutes = start; minutes < end; minutes += 30) {
    const startHour = Math.floor(minutes / 60);
    const startMinute = minutes % 60;
    const endMinutes = minutes + 30;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    slots.push(
      `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')} - ${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`,
    );
  }
  return slots;
};

const readStore = () => {
  if (canUseLocalStorage()) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Unable to read availability from localStorage, falling back to memory store.', error);
      return memoryStore;
    }
  }
  return memoryStore;
};

const writeStore = (value) => {
  if (canUseLocalStorage()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (error) {
      console.warn('Unable to persist availability to localStorage, storing in memory instead.', error);
      Object.assign(memoryStore, value);
    }
  } else {
    Object.assign(memoryStore, value);
  }
};

export const getAvailabilityForDate = async (date) => {
  await delay();
  if (!date) {
    return {
      availableSlots: [],
      bookedSlots: [],
    };
  }

  const bookings = readStore();
  const bookedSlots = bookings[date] || [];
  const availableSlots = generateDailySlots().filter((slot) => !bookedSlots.includes(slot));

  return {
    availableSlots,
    bookedSlots,
  };
};

export const bookSlotForDate = async ({ date, slot, name, email, contactNumber, company }) => {
  await delay(350);
  if (!date || !slot) {
    const error = new Error('A meeting date and time are required.');
    error.code = 'MISSING_FIELDS';
    throw error;
  }

  const bookings = readStore();
  const bookedSlots = bookings[date] || [];

  if (bookedSlots.includes(slot)) {
    const error = new Error('This slot has already been booked. Please select another time.');
    error.code = 'SLOT_UNAVAILABLE';
    throw error;
  }

  const updatedBookings = {
    ...bookings,
    [date]: [...bookedSlots, slot],
  };
  writeStore(updatedBookings);

  return {
    success: true,
    date,
    slot,
    name,
    email,
    contactNumber,
    company,
  };
};

export const clearAvailabilityStore = () => {
  if (canUseLocalStorage()) {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  Object.keys(memoryStore).forEach((key) => delete memoryStore[key]);
};

export default {
  getAvailabilityForDate,
  bookSlotForDate,
  clearAvailabilityStore,
};
