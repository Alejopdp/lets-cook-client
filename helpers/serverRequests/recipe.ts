import axios from "axios";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/recipe`;

export const getRecipes = async (token: string, locale: string) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${apiUrl}/`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getRecipeById = async (token, id, locale) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            params: {
                locale,
            },
            url: `${apiUrl}/${id}`,
        });
        return res;
    } catch (error) {
        console.log("***->", error);
        return error.response;
    }
};

export const getRecipesForOrder = async (orderId, token: string, locale = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/for-order/${orderId}`,
            headers: { authorization: token },
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        console.log("***-> Recipe Oops!: ", error);
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
            url: `${apiUrl}/${id}`,
        });
        return res;
    } catch (error) {
        console.log("***->", error);
        return error.response;
    }
};

export const getRecipesFilterOptions = async (token: string) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${apiUrl}/filters`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getRecipeFormData = async (token, locale) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${apiUrl}/get-data-for-creation`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const createRecipe = async (recipe) => {
    try {
        const res = await axios({
            method: "POST",
            headers: { "Content-Type": "multipart/form-data", authorization: getFromLocalStorage("token") },
            url: `${apiUrl}/`,
            data: recipe,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateRecipeWeeks = async (recipeId, weeksIds) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-weeks/${recipeId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                weeksIds,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateRecipe = async (recipeId, recipe, locale) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/${recipeId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: recipe,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteRecipeVariant = async (recipeVariantSku) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/delete-variant/${recipeVariantSku}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        console.log("Error: ", error);
        return error.response;
    }
};
