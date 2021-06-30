// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import PaymentOrderGrid from "./paymentOrderGrid";

const PaymentOrderDetail = (props) => {
    return (
        <Container>
            <DashboardWithBackTitle title="Detalle de la orden de pago" />
            <PaymentOrderGrid />
        </Container>
    );
};

export default PaymentOrderDetail;
