import Axios from "axios";
import FileDownload from "js-file-download";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;

export const cancelSubscription = async (subscriptionId: string, reason: string, comment: string, locale: string = "es") => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${subscriptionId}`,
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
            responseType: "blob",
        });

        FileDownload(res.data, "Suscripciones.xlsx");
        return res;
    } catch (error) {
        return error.response;
    }
};
