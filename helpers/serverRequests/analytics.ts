import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/analytics`;

export const getAnalytics = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: apiUrl,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
