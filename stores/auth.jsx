import create from "zustand";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set((state) => ({ isAuthenticated })),
}));
