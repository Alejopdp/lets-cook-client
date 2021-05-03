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
