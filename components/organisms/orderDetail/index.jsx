// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../layout/dashboardTitleWithBackButton";
import OrderGrid from "./orderGrid"

const OrderDetail = (props) => {
    return (
        <>
            <DashboardWithBackTitle title="Detalle de la orden" />
            <OrderGrid />
        </>
    );
};

export default OrderDetail;
