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
