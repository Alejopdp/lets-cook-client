import Axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const login = async (email, password) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/login`,
            data: { email, password },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const forgotPassword = async (email) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/forgot-password/${email}`,
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
            url: `${apiUrl}/verify-token`,
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
            url: `${apiUrl}/generate-password`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createUser = async (newUser) => {
    try {
        const res = await Axios({
            method: "POST",
            // headers: {
            //     Authorization: token
            // },
            url: `${apiUrl}`,
            data: {
                ...newUser,
            },
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
            url: `${apiUrl}/generate-password`,
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

export const getUserById = async (id) => {
    try {
        const res = await Axios({
            method: "GET",
            // headers: {
            //     Authorization: token
            // },
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getUserList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            // headers: {
            //     Authorization: token,
            // },
            url: `${apiUrl}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateUser = async (user) => {
    try {
        const res = await Axios({
            method: "PUT",
            // headers: {
            //     Authorization: token
            // },
            url: `${apiUrl}/${user.id}`,
            data: {
                ...user,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteUser = async (id) => {
    try {
        const res = await Axios({
            method: "DELETE",
            // headers: {
            //     Authorization: token
            // },
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
