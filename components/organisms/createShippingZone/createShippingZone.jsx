// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import ShippingZoneForm from "../shippingZoneForm";

const CreateShippingZone = () => {
    return (
        <>
            <DashboardWithBackTitle title="Crear zona de envío" />
            <ShippingZoneForm />
        </>
    );
};

export default CreateShippingZone;
