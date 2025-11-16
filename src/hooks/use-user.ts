'use client';

import { create } from 'zustand';

type UserState = {
  name: string;
  email: string;
  avatarUrl: string;
};

type UserActions = {
  setUser: (user: Partial<UserState>) => void;
};

const useUserStore = create<UserState & UserActions>((set) => ({
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user-avatar/40/40',
  setUser: (user) => set((state) => ({ ...state, ...user })),
}));

export function useUser() {
  const store = useUserStore();
  return store;
}
