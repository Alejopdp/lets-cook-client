import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/shipping`;

export const getZonesList = async () => {
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

export const getZoneById = async (zoneId) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${zoneId}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const toggleZoneState = async (zoneId, state) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/toggle-state/${zoneId}`,
            data: { state },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteZone = async (zoneId) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${zoneId}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const createZone = async (data) => {
    try {
        const res = await Axios({
            headers: { "Content-Type": "multipart/form-data" },
            method: "POST",
            url: `${apiUrl}`,
            data,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateZone = async (zone, zoneId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${planId}`,
            data: plan,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
