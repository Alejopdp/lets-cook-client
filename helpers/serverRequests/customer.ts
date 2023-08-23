import Axios from "axios";
import FileDownload from "js-file-download";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";
import { BillingData, Customer, ShippingAddress, Wallet } from "helpers/types/customer";

const { getFromLocalStorage } = useLocalStorage();
// const serverUrl = "http://localhost:3001/api/v1";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

export const getCustomerList = async (token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
export const searchCustomers = async (customerName: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/by-name/${customerName}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getCustomerById = async (id: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${id}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCustomerInformation = async (id: string, locale: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            params: {
                locale,
            },
            url: `${apiUrl}/information-as-admin/${id}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const toggleWeekState = async (orderId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/toggle-state/${orderId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteCustomer = async (id: string) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${id}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createCustomer = async (customer: any) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/create`,
            data: customer,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateCustomer = async (customer: any, id: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${id}`,
            data: customer,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateCustomerPersonalData = async (customer: Partial<Customer>) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-info/${customer.id}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                name: customer.name,
                lastName: customer.lastName,
                phone1: customer.phone1,
                phone2: customer.phone2,
                // birthDate: personalData.birthDate,
                preferredLanguage: customer.preferredLanguage,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateShippingAddress = async (id: string, shippingAddress: ShippingAddress) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-shipping/${id}`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            data: {
                lat: shippingAddress.latitude,
                long: shippingAddress.longitude,
                name: shippingAddress.addressName,
                details: shippingAddress.addressDetails,
                full_name: shippingAddress.addressName,
                delivery_time: shippingAddress.preferredShippingHour,
                city: shippingAddress.city,
                country: shippingAddress.country,
                province: shippingAddress.province,
                postalCode: shippingAddress.postalCode,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateBillingData = async (id: string, data: BillingData) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-billing/${id}`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            data: {
                lat: data.latitude,
                long: data.longitude,
                addressName: data.addressName,
                customerName: data.customerName,
                details: data.details,
                identification: data.identification,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const changeDefaultPaymentMethod = async (paymentMethodId: string, customerId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-payment/${customerId}`,
            headers: {
                Authorization: getFromLocalStorage("token"),
            },
            data: {
                id: paymentMethodId,
                isDefault: true,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const exportCustomers = async (createdAt: Date | undefined) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export`,
            responseType: "blob",
            params: {
                createdAt,
            },
            headers: { authorization: getFromLocalStorage("token") },
        });

        FileDownload(res.data, "Clientes.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};

export const addNewPaymentMethod = async (customerId: string, stripePaymentMethodId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/add-payment-method/${customerId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                stripePaymentMethodId,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const exportCustomerActions = async (customerId: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export-actions/${customerId}`,
            headers: { authorization: getFromLocalStorage("token") },
            responseType: "blob",
        });

        FileDownload(res.data, "Acciones de cliente.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};

export const exportAllCustomersActions = async (startDate: Date, endDate: Date) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export-actions`,
            headers: { authorization: getFromLocalStorage("token") },
            params: {
                startDate,
                endDate,
            },
            responseType: "blob",
        });

        FileDownload(res.data, "Acciones de clientes.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};

export const createWallet = async (customerId: string, wallet: Wallet) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/wallet/${customerId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                ...wallet,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
}

export const updateWallet = async (customerId: string, wallet: Wallet) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/wallet/${customerId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                ...wallet,
            },
        });

        return res
    } catch (error) {
        return error.response;
    }
}

export const chargeMoneyToWallet = async (customerId: string, amountToCharge: number) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/wallet/charge/${customerId}`,
            headers: { authorization: getFromLocalStorage("token") },
            data: {
                amountToCharge,
            },
        });

        return res
    } catch (error) {
        return error.response;
    }
}