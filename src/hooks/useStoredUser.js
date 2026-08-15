import { useState, useEffect } from 'react';
import { SESSION_KEY } from '../constants/storage';

const readStoredUser = () => {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const useStoredUser = () => {
  const [user, setUser] = useState(() => readStoredUser());

  useEffect(() => {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [user]);

  return [user, setUser];
};
