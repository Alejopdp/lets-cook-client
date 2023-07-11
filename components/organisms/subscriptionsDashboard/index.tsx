// Utils & Config
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { exportSubscriptions, getSubscriptions, exportCancellations } from "../../../helpers/serverRequests/subscription";
import { useSnackbar } from "notistack";

// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import SubscriptionTable from "./subscriptionTable";
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import SubscriptionDashboardExports from "components/layout/SubscriptionDashboardExports";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const SubscriptionsDashboard = (props) => {
    const [subscriptions, setsubscriptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isExportingSubscriptions, setIsExportingSubscriptions] = useState(false);
    const [isExportingCancellations, setIsExportingCancellations] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { userInfo } = useUserInfoStore();
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.VIEW_SUBSCRIPTION)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const canCreate = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.CREATE_SUBSCRIPTION),
        [userInfo]
    );
    const canExportSubscriptions = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.EXPORT_SUBSCRIPTIONS),
        [userInfo]
    );

    const canExportCancellations = useMemo(
        () => Array.isArray(userInfo.permissions) && userInfo.permissions.includes(Permission.EXPORT_CANCELLATIONS),
        [userInfo]
    );
    const handleClickExport = async () => {
        setIsExportingSubscriptions(true);
        const res = await exportSubscriptions();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsExportingSubscriptions(false);
    };

    const handleClickCancellations = async () => {
        setIsExportingCancellations(true);
        const res = await exportCancellations();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
        setIsExportingCancellations(false);
    };

    const exportOptions = useMemo(() => {
        const exportOptions = [];

        if (canExportSubscriptions) exportOptions.push({ title: "Exportar suscripciones", handler: handleClickExport, isSubmitting: isExportingSubscriptions });
        if (canExportCancellations) exportOptions.push({ title: "Exportar cancelaciones", handler: handleClickCancellations, isSubmitting: isExportingCancellations });

        return exportOptions;
    }, [canExportCancellations, canExportSubscriptions, isExportingCancellations, isExportingSubscriptions]);

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

    if (isLoading) return <></>;
    return (
        <>
            <SubscriptionDashboardExports
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
