import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-order`;

export const getPaymentOrders = async (locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}`,
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

export const getPaymentOrder = async (paymentOrderId: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/${paymentOrderId}`,
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
