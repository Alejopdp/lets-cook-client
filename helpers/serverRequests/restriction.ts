import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/restriction`;

export const getRestrictions = async (locale: string = "es") => {
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
