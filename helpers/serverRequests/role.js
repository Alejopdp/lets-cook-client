import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/role`;

export const getRoleList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
