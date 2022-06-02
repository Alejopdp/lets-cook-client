import Axios from "axios";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
// const serverUrl = "http://localhost:3001/api/v1";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/plan`;

export const getPlanList = async (locale: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
            headers: { authorization: token },
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getPlanById = async (planId: string, locale: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${planId}`,
            headers: { authorization: token },
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const togglePlanState = async (planId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/toggle-state/${planId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deletePlan = async (planId) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${planId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createPlan = async (plan) => {
    try {
        const res = await Axios({
            headers: { "Content-Type": "multipart/form-data", authorization: getFromLocalStorage("token") },
            method: "POST",
            url: `${apiUrl}`,
            data: plan,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getAdditionalPlans = async (locale: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/additionals`,
            headers: { authorization: token },
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updatePlan = async (plan, planId, locale) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${planId}`,
            data: plan,
            headers: { authorization: getFromLocalStorage("token") },
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
