import { useState } from "react";

export const usePersistToken = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setError] = useState(null);
    const [isFail, setFail] = useState(false);
    const [isSussess, setSuccess] = useState(false);

    const toPersistToken = async (token) => {
        setIsLoading(true);
        try {
            const tokenQuery = token ? `token=${token}` : `clear=true`;
            const req = await fetch(`api/preview?${tokenQuery}`);
            const json = req.json();
            if (json.result === "success") {
                setSuccess(true);
            } else {
                setFail(true);
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const resetState = () => {
        setIsLoading(false);
        setError(null);
        setFail(false);
        setSuccess(false);
    };

    return [
        toPersistToken,
        {
            loading: isLoading,
            error: hasError,
            isFailed: isFail,
            isSussess: isSussess,
        },
        resetState,
    ];
};

export default usePersistToken;
