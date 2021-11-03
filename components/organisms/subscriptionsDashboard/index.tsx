// Utils & Config
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { exportSubscriptions, getSubscriptions, exportCancellations } from "../../../helpers/serverRequests/subscription";
import { useSnackbar } from "notistack";

// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import SubscriptionTable from "./subscriptionTable";
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import DashboardTitleWithManyCSV from "components/layout/dashboardTitleWithManyCSV/dashboardTitleWithManyCSV";

const SubscriptionsDashboard = (props) => {
    const [subscriptions, setsubscriptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getSubscriptionList = async () => {
            const res = await getSubscriptions("es");

            if (res.status === 200) {
                setsubscriptions(res.data.filter((sub) => sub.state !== "SUBSCRIPTION_CANCELLED"));
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getSubscriptionList();
    }, []);

    const handleClickExport = async () => {
        const res = await exportSubscriptions();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const filterSubscriptions = (subscriptions) => {
        return !!searchValue
            ? subscriptions.filter((subscription) => {
                  return (
                      subscription.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
                      subscription.customerEmail.toLowerCase().includes(searchValue.toLowerCase())
                  );
              })
            : subscriptions;
    };

    const handleClickCancellations = async () => {
        const res = await exportCancellations();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const exportOptions = useMemo(() => {
        return [
            { title: "Exportar suscripciones", handler: handleClickExport },
            { title: "Exportar cancelaciones", handler: handleClickCancellations },
        ];
    }, []);

    return (
        <>
            <DashboardTitleWithManyCSV
                title="Suscripciones"
                exports={exportOptions}
                import={false}
                handleClickImport={function (e: any): void {
                    throw new Error("Function not implemented.");
                }}
                importFile={undefined}
            />
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <SearchInputField handlerOnChange={setSearchValue} placeholder="Buscar por nombre de cliente o correo..." />
                </Box>
            </Grid>

            <SubscriptionTable rows={filterSubscriptions(subscriptions)} />
        </>
    );
};

export default SubscriptionsDashboard;

SubscriptionsDashboard.propTypes = {};
