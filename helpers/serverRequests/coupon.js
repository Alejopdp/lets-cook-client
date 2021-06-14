import Axios from "axios";

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

export const deleteCoupon = async (couponId) => {
    try {
        const res = await Axios({
            method: "DELETE",
            url: `${apiUrl}/${couponId}`
        })

        return res
    } catch (error) {
        return error.response
    }
}