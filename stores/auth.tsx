import { Permission } from "helpers/types/permission";
import {StoreApi, UseBoundStore, create} from "zustand";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set((state) => ({ isAuthenticated })),
}));

export interface IUserInfoStore {
    userInfo: {
        fullName: string;
        firstName: string;
        lastName: string;
        email: string;
        roleTitle: string;
        permissions: Permission[];
    };
}

export const useUserInfoStore: UseBoundStore<StoreApi<IUserInfoStore>> = create((set) => ({
    userInfo: {
        fullName: "",
        firstName: "",
        lastName: "",
        email: "",
        roleTitle: "",
        permissions: [],
    },
    setuserInfo: (userInfo) => set((state) => ({ userInfo })),
}));
