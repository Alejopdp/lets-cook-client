// Utils & Config
import React from "react";

// External components
import { Container } from "@material-ui/core";

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import ShippingZoneForm from "../shippingZoneForm";

const UpdateShippingZone = (props) => {
    return (
        <Container>
            <DashboardWithBackTitle title="Modificar zona de envío" />
            <ShippingZoneForm shippingZone={props.shippingZone} update={true} />
        </Container>
    );
};

export default UpdateShippingZone;
