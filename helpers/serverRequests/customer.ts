import Axios from "axios";
import { BillingData, Personaldata, ShippingAddress } from "components/organisms/customerProfile/interface";
import FileDownload from "js-file-download";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
// const serverUrl = "http://localhost:3001/api/v1";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

export const getCustomerList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
export const searchCustomers = async (customerName) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/by-name/${customerName}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCustomerById = async (id) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCustomerInformation = async (id, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            params: {
                locale,
            },
            url: `${apiUrl}/information-as-admin/${id}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const toggleWeekState = async (orderId) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/toggle-state/${orderId}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${id}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createCustomer = async (customer) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/create`,
            data: customer,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateCustomer = async (customer, id) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${id}`,
            data: customer,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateCustomerPersonalData = async (personalData: Personaldata) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-info/${personalData.id}`,
            data: {
                name: personalData.name,
                lastName: personalData.lastName,
                phone1: personalData.phone1,
                phone2: personalData.phone2,
                // birthDate: personalData.birthDate,
                preferredLanguage: personalData.preferredLanguage,
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
                name: shippingAddress.name,
                details: shippingAddress.details,
                full_name: shippingAddress.name,
                delivery_time: shippingAddress.preferredShippingHour,
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

export const exportCustomers = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/export`,
            responseType: "blob",
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
            data: {
                stripePaymentMethodId,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
