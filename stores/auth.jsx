import create from "zustand";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set((state) => ({ isAuthenticated })),
}));

export const useUserInfoStore = create((set) => ({
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
