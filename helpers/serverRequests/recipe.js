import axios from "axios";

const { SERVER_URL = "http://localhost:3001/api/v1" } = process.env;

export const loadRecipesList = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${SERVER_URL}/recipe`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const loadFiltersList = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${process.env.SERVER_URL}/recipe/filters`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteRecipesList = async (token, id) => {
    try {
        const res = await axios({
            method: "DELETE",
            headers: {
                Authorization: token,
            },
            url: `${SERVER_URL}/recipe/${id}`,
        });
        return res;
    } catch (error) {
        console.log('***->', error);
        return error.response;
    }
};
