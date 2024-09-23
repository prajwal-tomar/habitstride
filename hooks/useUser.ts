'use client'

import { useState, useEffect } from 'react';

interface User {
  name: string;
  timezone: string;
  profilePicture: string;
  notifications: boolean;
  habitEditing: boolean;
}

interface UseUserReturn {
  user: User;
  updateUser: (data: Partial<User>) => void;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User>({
    name: '',
    timezone: '',
    profilePicture: '',
    notifications: false,
    habitEditing: false,
  });

  useEffect(() => {
    // Fetch user data from an API or local storage
    const fetchUserData = async () => {
      const userData = await fetch('/api/user').then(res => res.json());
      setUser(userData);
    };

    fetchUserData();
  }, []);

  function updateUser(data: Partial<User>) {
    setUser(prevUser => ({ ...prevUser, ...data }));
    // Optionally, send updated data to an API
    fetch('/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  return { user, updateUser };
}