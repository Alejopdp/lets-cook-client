import Axios from "axios";
import { CouponState } from "types/coupon/couponState";
import FileDownload from "js-file-download";
import { useLocalStorage } from "hooks/useLocalStorage/localStorage";

const { getFromLocalStorage } = useLocalStorage();
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/coupon`;

export const createCoupon = async (couponData) => {
    try {
        const res = await Axios({
            method: "POST",
            headers: { authorization: getFromLocalStorage("token") },
            url: apiUrl,
            data: couponData,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCouponList = async (token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: apiUrl,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCouponById = async (couponId: string, token: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${couponId}`,
            headers: { authorization: token },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const exportCoupons = async () => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/export`,
            responseType: "blob",
            headers: { authorization: getFromLocalStorage("token") },
        });

        FileDownload(res.data, "Cupones.xlsx");
        return res;
    } catch (error) {
        error.response.data = JSON.parse(await error.response.data.text());
        return error.response;
    }
};

export const updateCouponState = async (state: CouponState, couponId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${couponId}`,
            data: { state },
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteCoupon = async (couponId: string) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${couponId}`,
            headers: { authorization: getFromLocalStorage("token") },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const importManyCoupons = async (data: any) => {
    try {
        const res = await Axios({
            method: "POST",
            url: `${apiUrl}/import`,
            headers: {
                "Content-type": "multipart/form-data",
                authorization: getFromLocalStorage("token"),
            },
            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
