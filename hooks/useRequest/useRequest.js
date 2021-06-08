import axios from "axios";
import { useEffect, useState } from "react";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../useLocalStorage/localStorage";

export const useRequest = (token) => {
    const [isLoading = false, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { getFromLocalStorage } = useLocalStorage();

    const resetState = () => {
        setError(false);
        setData(null);
    };

    const doRequest = async ({
        endpointSetting = {
            endpoint: "",
            needAuth: true,
            method: "",
        },
        query = {},
        body = {},
        token,
        contentType='application/json'
    }) => {
        const _API_URL = `${process.env.NEXT_PUBLIC_API_URL}${endpointSetting.endpoint}`;
        resetState();
        setIsLoading(true);
        let _token = token;
        if (endpointSetting.needAuth && !!!token) {
            _token = getFromLocalStorage(LOCAL_STORAGE_KEYS.token);
        }
        try {
            const res = await axios({
                method: endpointSetting.method,
                withCredentials: endpointSetting.needAuth,
                headers: {
                    "Content-Type":contentType,
                    Authorization: _token,
                    // Authorization: endpointSetting.needAuth ? `Bearer ${_token}` : undefined,
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
