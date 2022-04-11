import React, { useContext, useEffect, useState } from "react";
import { IMetrics, MetricsContext } from "stores/metrics";
import { getAnalytics } from "helpers/serverRequests/analytics";

const useMetrics = (): { metrics: IMetrics; refreshMetrics: () => void; isLoading: boolean; fetchError: string } => {
    const { metrics, setMetrics, isLoading, setIsLoading, setHasFetched, fetchError, setFetchError } = useContext(MetricsContext);

    const refreshMetrics = async () => {
        // setIsLoading(true);
        const res = await getAnalytics();

        if (res && res.status === 200) {
            setMetrics(res.data);
            setHasFetched(true);
            setFetchError("");
        } else {
            setHasFetched(false);
            setFetchError("Ocurrio un error al buscar las metricas");
        }
        // setIsLoading(false);
    };
    return { metrics, refreshMetrics, isLoading, fetchError };
};

useMetrics.propTypes = {};

export default useMetrics;
