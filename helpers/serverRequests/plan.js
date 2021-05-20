import Axios from "axios";

// const serverUrl = "http://localhost:3001/api/v1";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/plan`;

export const getPlanList = async (locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
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

export const getPlanById = async (planId, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${planId}`,
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
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createPlan = async (plan) => {
    try {
        const res = await Axios({
            headers: { "Content-Type": "multipart/form-data" },
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

export const getAdditionalPlans = async (locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/additionals`,
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
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
