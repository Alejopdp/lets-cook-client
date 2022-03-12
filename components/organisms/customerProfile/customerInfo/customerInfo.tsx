// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { CustomerInfoProps } from "../interface";
// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import DeliveryAddress from "./deliveryAddress";
import BillingData from "./billingData";
import PaymentMethods from "./paymentMethod";
import OtherInfo from "./otherInfo";

const CustomerInfo = (props: CustomerInfoProps) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                <PersonalData personalData={props.customer.personalData} handleUpdatePersonalData={props.handleUpdatePersonalData} />
            </Grid>
            <Grid item xs={12} md={4}>
                <DeliveryAddress
                    setCustomer={props.setCustomer}
                    customer={props.customer}
                    shippingAddress={props.customer.personalData.shippingAddress}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <BillingData customer={props.customer} handleUpdateBillingData={props.handleUpdateBillingData} />
            </Grid>
            <Grid item xs={12} md={4}>
                <PaymentMethods
                    handleUpdatePaymentMethods={props.handleUpdatePaymentMethods}
                    paymentMethods={props.customer.personalData.paymentMethods}
                    customerId={props.customer.personalData.id}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <OtherInfo friendCode={props.customer.friendCode} />
            </Grid>
        </>
    );
};

export default CustomerInfo;

CustomerInfo.propTypes = {};
