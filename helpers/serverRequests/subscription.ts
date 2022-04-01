import Axios from "axios";
import FileDownload from "js-file-download";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;

const { getFromLocalStorage } = useLocalStorage();

export const createSubscription = async (data) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/as-admin`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            params: {
                locale: "es",
            },

            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const cancelSubscription = async (subscriptionId: string, reason: string, comment: string, locale: string = "es") => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${subscriptionId}`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            params: {
                locale,
            },
            data: {
                cancellationReason: reason,
                cancellationComment: comment,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getSubscriptionById = async (id: string, locale: string = "es") => {
    try {
        const res = await Axios({
            method: "GET",
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            url: `${apiUrl}/information-as-admin/${id}`,
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

export const updateSubscriptionRestriction = async (subscriptionId: string, newRestrictionId: string, comment?: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            url: `${apiUrl}/update-restriction/${subscriptionId}`,
            data: {
                restrictionId: newRestrictionId,
                comment,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getSubscriptions = async (locale: string) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            url: `${apiUrl}/`,
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

export const exportSubscriptions = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            responseType: "blob",
        });

        FileDownload(res.data, "Suscripciones.xlsx");
        return res;
    } catch (error) {
        return error.response;
    }
};

export const applyCouponToSubscription = async (subscriptionId: string, couponCode: string, customerId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            url: `${apiUrl}/apply-coupon/${subscriptionId}`,
            data: {
                couponCode,
                customerId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const exportCancellations = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export-cancellations`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            responseType: "blob",
        });

        FileDownload(res.data, "Cancelaciones.xlsx");
        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteSubscription = async (id: string) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${id}`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
        });

        return res;
    } catch (error) {}
};

export const getDataForSwappingAPlan = async (subscriptionId: string, locale?: string) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/plan/data-for-swapping/${subscriptionId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const swapPlan = async (subscriptionId: string, newPlanId: string, newPlanVariantId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/swap-plan/${subscriptionId}`,
            data: {
                newPlanId,
                newPlanVariantId,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateNextBillingDate = async (subscriptionId: string, newDate: Date) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/move-next-billing-date/${subscriptionId}`,
            params: {
                locale: "es",
            },
            data: {
                nextBillingDate: newDate,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateSubscriptionFrequency = async (subscriptionId: string, frequency: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/change-frequency/${subscriptionId}`,
            params: {
                locale: "es",
            },

            data: {
                frequency,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
