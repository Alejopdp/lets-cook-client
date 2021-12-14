import Axios from "axios";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/log`;

export const getLogs = async (customerId: string) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${apiUrl}`,
            params: {
                customerId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
