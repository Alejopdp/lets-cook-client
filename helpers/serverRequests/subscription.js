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
