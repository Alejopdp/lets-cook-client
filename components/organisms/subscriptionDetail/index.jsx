// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import SubscriptionGrid from "./subscriptionGrid";

const SubscriptionDetail = (props) => {
    return (
        <Container>
            <DashboardWithBackTitle title="Detalle de la suscripción" />
            <SubscriptionGrid />
        </Container>
    );
};

export default SubscriptionDetail;
