// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// External components
import { Box, Grid } from "@material-ui/core";

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
        justifyContent: "center",
        alignContent: "flex-start"
    },
    grid: {
        marginTop: theme.spacing(2)
    }
}));

const CustomerInfo = (props) => {
    const { container,grid } = useStyles();

    return (
            <>
                <Grid item xs={12} md={4}>
                    <PersonalData customer={props.customer} handleUpdatePersonalData={props.handleUpdatePersonalData} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <DeliveryAddress customer={props.customer.deliveryAddress} handleUpdateDeliveryAddress={props.handleUpdateDeliveryAddress} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BillingData customer={props.customer.billingData} handleUpdateBillingData={props.handleUpdateBillingData} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PaymentMethods customer={props.customer.paymentMethod} />
                </Grid>
                </>

    );
};

export default CustomerInfo;

CustomerInfo.propTypes = {

};
