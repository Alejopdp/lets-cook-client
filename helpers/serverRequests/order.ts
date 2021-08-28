import axios from "axios";
import { SkippableOrder } from "helpers/types/order";
import FileDownload from "js-file-download";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const getOrderById = async (orderId: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/${orderId}`,
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

export const exportOrdersWithRecipesSelection = async () => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/export-next-with-recipes-selection`,
            responseType: "blob",
        });

        FileDownload(res.data, "Selección de recetas.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};
