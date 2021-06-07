import { clearLocalStorage, getToken } from "../../hooks/useLocalStorage/localStorage";
import { verifyToken } from "../serverRequests/user";

export const isAuthenticated = async () => {
    // const token = getToken();

    // if (token) {
    //     const res = await verifyToken(token);

    //     if (res.status !== 200) {
    //         clearLocalStorage();
    //         return false;
    //     } else {
    //         return true;
    //     }
    // } else {
    //     return false;
    // }
};
