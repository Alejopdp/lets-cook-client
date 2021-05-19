import axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/recipe`;

export const getRecipes = async (token, locale) => {
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

export const getRecipeById = async (token, id) => {
    try {
        const res = await axios({
            method: "GET",
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

export const getRecipesFilterOptions = async (token) => {
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
            headers: { "Content-Type": "multipart/form-data" },
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
            data: {
                weeksIds,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
