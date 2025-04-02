
import { useState, useEffect } from 'react';
import { User } from '@/types/auth-types';

export function usePersistentUser() {
  const [user, setUser] = useState<User | null>(null);
  
  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  
  return {
    user,
    setUser
  };
}
