import Axios from "axios";

import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/shipping`;

export const getZonesList = async (token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getZoneById = async (zoneId: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${zoneId}`,
            headers: { authorization: token },
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
            headers: { authorization: getFromLocalStorage("token") },
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
            headers: { authorization: getFromLocalStorage("token") },
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
            headers: { "Content-Type": "multipart/form-data", authorization: getFromLocalStorage("token") },
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
            url: `${apiUrl}/${zoneId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: zone,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
