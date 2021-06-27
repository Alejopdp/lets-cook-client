export const LOCAL_STORAGE_KEYS = {
    token: "token",
    userInfo: "user-info",
};

export const useLocalStorage = () => {
    const saveInLocalStorage = (key, value) => {
        if (typeof window === "undefined") return false;
        return localStorage.setItem(key, JSON.stringify(value));
    };

    const getFromLocalStorage = (key) => {
        if (typeof window === "undefined") return {};
        return JSON.parse(localStorage.getItem(key));
    };

    const resetLocalStorage = () => {
        if (typeof window === "undefined") return false;
        localStorage.clear();
    };

    return {
        saveInLocalStorage,
        getFromLocalStorage,
        resetLocalStorage,
    };
};

export default useLocalStorage;
