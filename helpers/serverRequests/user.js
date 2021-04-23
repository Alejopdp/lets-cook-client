import Axios from "axios";

const serverUrl = "http://localhost:3001";

export const login = async (email, password) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${serverUrl}/api/v1/user/login`,
            data: { email, password },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const forgotPassword = async (id) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${serverUrl}/api/v1/user/forgot-password/${id}`,
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const verifyToken = async (token) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${serverUrl}/api/v1/user/verify-token`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getDataForGeneratingNewPassword = async (token) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${serverUrl}/api/v1/user/generate-password`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const generateNewPassword = async (email, password, token) => {
    try {
        const res = await Axios({
            method: "POST",
            headers: {
                Authorization: token,
            },
            url: `${serverUrl}/api/v1/user/generate-password`,
            data: {
                email,
                password,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
