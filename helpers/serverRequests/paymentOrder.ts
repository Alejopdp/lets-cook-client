import axios from "axios";
import { PaymentOrderState } from "helpers/types/paymentOrderState";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-order`;

export const getPaymentOrders = async (token: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}`,
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

export const getPaymentOrder = async (token: string, paymentOrderId: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/${paymentOrderId}`,
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

export const updatePaymentOrderState = async (paymentOrderId: string, state: PaymentOrderState) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-state/${paymentOrderId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                state,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const chargeOnePaymentOrder = async (paymentOrderId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/charge/${paymentOrderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const refundPaymentOrder = async (paymentOrderId: string, amount: number) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/refund/${paymentOrderId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: { amount },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const retryPayment = async (paymentOrderId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/retry-payment/${paymentOrderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const cancelAPaymentOrder = async (orderId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${orderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
