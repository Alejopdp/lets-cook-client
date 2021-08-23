// Utils & Config
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { toggleZoneState, deleteZone } from "../../../helpers/serverRequests/shipping";
import { exportSubscriptions, getSubscriptions } from "../../../helpers/serverRequests/subscription";

// External components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

// Internal components
import DashboardTitleWithCSV from "../../layout/dashboardTitleWithCSV/dashboardTitleWithCSV";
import SubscriptionTable from "./subscriptionTable";
import { useSnackbar } from "notistack";

const SubscriptionsDashboard = (props) => {
    const [subscriptions, setsubscriptions] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const getSubscriptionList = async () => {
            const res = await getSubscriptions();

            if (res.status === 200) {
                setsubscriptions(res.data);
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        };

        getSubscriptionList();
    }, []);

    const handleClickExport = async () => {
        const res = await exportSubscriptions()

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(res.data, {variant: "error"})
        }
    }

    return (
        <>
            <DashboardTitleWithCSV title="Suscripciones" export handleClickExport={handleClickExport} />
            <SubscriptionTable rows={subscriptions} />
        </>
    );
};

export default SubscriptionsDashboard;

SubscriptionsDashboard.propTypes = {
    // shippingZones: PropTypes.array.isRequired,
};
