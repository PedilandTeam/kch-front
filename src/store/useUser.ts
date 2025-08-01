import { IUser } from '@/types/user';
import { StoreApi, UseBoundStore, create } from 'zustand';

type UseUser = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    getUser: () => IUser | null;
    clearUser: () => void;
    authenticated: () => boolean;
    verified: () => boolean;
};
export const useUser: UseBoundStore<StoreApi<UseUser>> = create<UseUser>(
    (set) => ({
        user: null,
        setUser: (user: IUser | null) => set({ user }),
        getUser: () => useUser.getState().user,
        clearUser: () => set({ user: null }),
        authenticated: () => !!useUser.getState().user,
        verified: () => useUser.getState().user?.emailVerified || false,
    })
);
