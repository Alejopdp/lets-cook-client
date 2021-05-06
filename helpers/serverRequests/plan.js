import Axios from "axios";

const serverUrl = "http://localhost:3001/api/v1";

export const getPlanList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${serverUrl}/plan`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPlanById = async (planId) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${serverUrl}/plan/${planId}`,
        });

        return res;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
};

export const togglePlanState = async (planId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${serverUrl}/plan/toggle-state/${planId}`,
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
            url: `${serverUrl}/plan/${planId}`,
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
            url: `${serverUrl}/plan`,
            data: plan,
        });

        return res;
    } catch (error) {
        console.log(error.response);
        return error.response;
    }
};

export const getAdditionalPlans = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${serverUrl}/plan/additionals`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updatePlan = async (plan, planId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${serverUrl}/plan/${planId}`,
            data: plan,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
