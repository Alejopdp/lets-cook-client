import { getAnalytics } from "helpers/serverRequests/analytics";
import { createContext, FC, useEffect, useState } from "react";
import { getAllRestaurantsOrdered } from "services/restaurants.service";

export const MetricsContext = createContext<any>([]);
export interface IMetrics {
    currentWeekOrdersQty: number;
    nextWeekOrdersQty: number;
    ordersQtyPercentage: number;
    kitsForCookingPercentage: number;
    billedAmountPercentage: number;
    billedAmountAvgPercentage: number;
    numberOfPersonsPercentage: number;
    numberOfPersonsAvgPercentage: number;
    additionalOrdersQtyPercentage: number;
    newCustomersQtyPercentage: number;
    activeCustomersPercentage: number;
    newLeadsPercentage: number;
    cancelledSubscriptionsQtyPercentage: number;
    halfWeekReceivedPercentage: number;
    skippedPercentage: number;
    currentWeekKitsForCooking: number;
    nextWeekKitsForCooking: number;
    currentWeekBilledAmount: number;
    nextWeekBilledAmount: number;
    currentWeekBilledAmountAvg: number;
    nextWeekBilledAmountAvg: number;
    currentWeekNumberOfPersons: number;
    nextWeekNumberOfPersons: number;
    currentWeekNumberOfPersonsAvg: number;
    nextWeekNumberOfPersonsAvg: number;
    currentWeekAdditionalOrdersQty: number;
    nextWeekAdditionalOrdersQty: number;
    currentWeekNewCustomersQty: number;
    nextWeekNewCustomersQty: number;
    currentWeekActiveCustomers: number;
    nextWeekActiveCustomers: number;
    currentWeekNewLeads: number;
    nextWeekNewLeads: number;
    currentWeekCancelledSubscriptionsQty: number;
    nextWeeekCancelledSubscriptionsQty: number;
    currentWeekhalfWeekReceived: number;
    nextWeekHalfWeekReceived: number;
    currentWeekSkippedAvg: number;
    nextWeekSkippedAvg: number;
    chosenRecipesGroupedByPlan: {
        [planName: string]: {
            chosenRecipes: number;
            notChosenRecipes: number;
            percentage: number;
        };
    };
    chosenRecipesGroupedByNumberOfPersons: {
        [numberOfPersons: string]: {
            chosenRecipes: number;
            notChosenRecipes: number;
            percentage: number;
        };
    };
}
export const MetricsProvider: FC = ({ children }) => {
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [metrics, setMetrics] = useState<IMetrics>({
        currentWeekOrdersQty: 0,
        nextWeekOrdersQty: 0,
        ordersQtyPercentage: 0,
        currentWeekKitsForCooking: 0,
        nextWeekKitsForCooking: 0,
        currentWeekBilledAmount: 0,
        nextWeekBilledAmount: 0,
        currentWeekBilledAmountAvg: 0,
        nextWeekBilledAmountAvg: 0,
        currentWeekNumberOfPersons: 0,
        nextWeekNumberOfPersons: 0,
        currentWeekNumberOfPersonsAvg: 0,
        nextWeekNumberOfPersonsAvg: 0,
        currentWeekAdditionalOrdersQty: 0,
        nextWeekAdditionalOrdersQty: 0,
        currentWeekNewCustomersQty: 0,
        nextWeekNewCustomersQty: 0,
        currentWeekActiveCustomers: 0,
        nextWeekActiveCustomers: 0,
        currentWeekNewLeads: 0,
        nextWeekNewLeads: 0,
        currentWeekCancelledSubscriptionsQty: 0,
        nextWeeekCancelledSubscriptionsQty: 0,
        currentWeekhalfWeekReceived: 0,
        nextWeekHalfWeekReceived: 0,
        currentWeekSkippedAvg: 0,
        nextWeekSkippedAvg: 0,
        chosenRecipesGroupedByPlan: {},
        activeCustomersPercentage: 0,
        newCustomersQtyPercentage: 0,
        newLeadsPercentage: 0,
        cancelledSubscriptionsQtyPercentage: 0,
        billedAmountPercentage: 0,
        billedAmountAvgPercentage: 0,
        numberOfPersonsPercentage: 0,
        numberOfPersonsAvgPercentage: 0,
        additionalOrdersQtyPercentage: 0,
        skippedPercentage: 0,
        kitsForCookingPercentage: 0,
        halfWeekReceivedPercentage: 0,
        chosenRecipesGroupedByNumberOfPersons: {},
    });
    const [fetchError, setFetchError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        const fetchAnalytics = async () => {
            const res = await getAnalytics();

            if (res && res.status === 200) {
                console.log("res.data", res.data);
                setMetrics(res.data);
                setIsLoading(false);
                setHasFetched(true);
                setFetchError("");
            } else {
                setIsLoading(false);
                setHasFetched(false);
                setFetchError("Ocurrio un error al buscar las metricas");
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <MetricsContext.Provider
            value={{ metrics, setMetrics, fetchError, setFetchError, hasFetched, isLoading, setIsLoading, setHasFetched }}
        >
            {children}
        </MetricsContext.Provider>
    );
};
