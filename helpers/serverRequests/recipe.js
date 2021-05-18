import axios from "axios";

const { SERVER_URL = "http://localhost:3001/api/v1" } = process.env;

export const getRecipes = async (token) => {
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

export const getRecipeById = async (token, id) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${SERVER_URL}/recipe/${id}`,
        });
        return res;
    } catch (error) {
        console.log("***->", error);
        return error.response;
    }
};

export const deleteRecipe = async (token, id) => {
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
        console.log("***->", error);
        return error.response;
    }
};

export const getRecipesFilterOptions = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${SERVER_URL}/recipe/filters`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getRecipeFormData = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${SERVER_URL}/recipe/get-data-for-creation`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};
