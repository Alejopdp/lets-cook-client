import axios from "axios";

export const loadRecipesList = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${process.env.SERVER_URL}/recipe`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};