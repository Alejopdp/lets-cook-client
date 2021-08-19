import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;

export const cancelSubscription = async (subscriptionId: string, locale: string = "es") => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${subscriptionId}`,
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
