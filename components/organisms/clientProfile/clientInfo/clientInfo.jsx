// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// External components
import { Grid, Box } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import DeliveryAddress from "./deliveryAddress";
import BillingData from "./billingData";
import PaymentMethods from "./paymentMethod";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
}));

const ClientInfo = (props) => {
    const { container } = useStyles();

    return (
        <Box className={container}>
            <PersonalData client={props.client} />

            <DeliveryAddress client={props.client.deliveryAddress} />

            <BillingData client={props.client.billingData} />

            <PaymentMethods client={props.client.paymentMethod} />
        </Box>
    );
};

export default ClientInfo;

ClientInfo.propTypes = {

};
