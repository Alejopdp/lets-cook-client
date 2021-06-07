import axios from "axios";
import { useEffect, useState } from "react";

export const useRequest = (token) => {
    const [isLoading = false, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const resetState = () => {
        setError(false);
        setData(null);
    }

    const doRequest = async ({
        endpointSetting = {
            endpoint: "",
            needAuth: true,
            method: "",
        },
        query = {},
        body = {},
        token,
    }) => {
        const _API_URL = `${process.env.NEXT_PUBLIC_API_URL}${endpointSetting.endpoint}`;
        resetState();
        setIsLoading(true);
        try {
            const res = await axios({
                method: endpointSetting.method,
                withCredentials: endpointSetting.needAuth,
                headers: {
                    Authorization: endpointSetting.needAuth ? token : undefined,
                    // Authorization: endpointSetting.needAuth ? `Bearer ${token}` : undefined,
                },
                data: body,
                params: query,
                url: `${_API_URL}`,
            });
            setData(res.data);
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return {
        isLoading,
        error,
        data,
        doRequest,
    };
};

export default useRequest;
