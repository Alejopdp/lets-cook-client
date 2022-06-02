import axios from "axios";
import { SkippableOrder } from "helpers/types/order";
import FileDownload from "js-file-download";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const getOrderById = async (orderId: string, token: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/${orderId}`,
            headers: { authorization: token },
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const chooseRecipesForOrder = async (orderId: string, subscriptionId: string, recipeSelection: any) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-recipes/${orderId}`,
            headers: {
                authorization: JSON.parse(window.localStorage.getItem("token")),
            },
            data: {
                recipeSelection,
                subscriptionId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const cancelOrder = async (orderId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${orderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const skipOrReactivateOrder = async (order: SkippableOrder) => {
    const ordersToSkip = [];
    const ordersToReactivate = [];

    if (order.isSkipped) ordersToReactivate.push(order.id);
    else ordersToSkip.push(order.id);
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/skip`,
            headers: {
                authorization: JSON.parse(window.localStorage.getItem("token")),
            },
            data: {
                ordersToSkip,
                ordersToReactivate,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

interface ExportOrdersWithRecipesSelection {
    weeks: string[];
    shippingDates: string[];
    billingDates: string[];
    customers: string[];
}

export const exportOrdersWithRecipesSelection = async (filters: ExportOrdersWithRecipesSelection) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/export-next-with-recipes-selection`,
            responseType: "blob",
            headers: { authorization: getFromLocalStorage("token") },
            data: filters,
        });

        FileDownload(res.data, "Selección de recetas.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};

export const getExportOrdersWithRecipesSelectionFilters = async (token: string) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/export-next-with-recipes-selection-filters`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const importRecipeSelectionForManyOrders = async (data) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { "Content-Type": "multipart/form-data", authorization: getFromLocalStorage("token") },
            url: `${apiUrl}/update-recipes`,
            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const moveOrderShippingDate = async (orderId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/move-shipping-date/${orderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
