import Axios from "axios";

// const serverUrl = "http://localhost:3001/api/v1";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

export const getCustomerList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCustomerById = async (id) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const toggleWeekState = async (orderId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/toggle-state/${orderId}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createCustomer = async (customer) => {
    try {
        const res = await Axios({
            headers: { "Content-Type": "multipart/form-data" },
            method: "POST",
            url: `${apiUrl}/create`,
            data: customer,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateCustomer = async (customer, id) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${id}`,
            data: customer,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
