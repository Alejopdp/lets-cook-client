import Axios from "axios";
import { CouponState } from "types/coupon/couponState";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/coupon`;

export const createCoupon = async (couponData) => {
    try {
        const res = await Axios({
            method: "POST",
            url: apiUrl,
            data: couponData,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCouponList = async () => {
    try {
        const res = await Axios({
            method: "GET",
            url: apiUrl,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getCouponById = async (couponId) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}/${couponId}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateCouponState = async (state: CouponState, couponId: string) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/${couponId}`,
            data: { state },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const deleteCoupon = async (couponId) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${couponId}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
