// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import DeliveryAddress from "./deliveryAddress";
import BillingData from "./billingData";
import PaymentMethods from "./paymentMethod";

const ClientInfo = (props) => {
    return (
        <Grid container direction="row">
            <Grid item>
                <PersonalData client={props.client} />
            </Grid>

            <Grid item>
                <DeliveryAddress client={props.client.deliveryAddress} />
            </Grid>

            <Grid item>
                <BillingData client={props.client.billingData} />
            </Grid>

            <Grid item>
                <PaymentMethods client={props.client.paymentMethod} />
            </Grid>
        </Grid>
    );
};

export default ClientInfo;

ClientInfo.propTypes = {

};
