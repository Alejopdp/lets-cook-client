import Axios from "axios";

const serverUrl = "http://localhost:3001";

export const getRoleList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${serverUrl}/api/v1/role`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
