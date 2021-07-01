// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// External components
import { Box } from "@material-ui/core";

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

const CustomerInfo = (props) => {
    const { container } = useStyles();

    return (
        <Box className={container}>
            <PersonalData customer={props.customer} handleUpdatePersonalData={props.handleUpdatePersonalData} />

            <DeliveryAddress customer={props.customer.deliveryAddress} handleUpdateDeliveryAddress={props.handleUpdateDeliveryAddress} />

            <BillingData customer={props.customer.billingData} handleUpdateBillingData={props.handleUpdateBillingData} />

            <PaymentMethods customer={props.customer.paymentMethod} />
        </Box>
    );
};

export default CustomerInfo;

CustomerInfo.propTypes = {

};
