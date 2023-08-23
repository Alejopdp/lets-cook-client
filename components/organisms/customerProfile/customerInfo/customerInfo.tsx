// Utils & Config
import React from "react";
import { CustomerInfoProps } from "../interface";
import { Grid } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import DeliveryAddress from "./deliveryAddress";
import BillingData from "./billingData";
import PaymentMethods from "./paymentMethod";
import OtherInfo from "./otherInfo";
import CustomerWallet from "./customerWallet";

const CustomerInfo = (props: CustomerInfoProps) => {
    return (
        <>
            <Grid item xs={12} md={4}>
                <PersonalData customer={props.customer} handleUpdatePersonalData={props.handleUpdatePersonalData} />
            </Grid>
            <Grid item xs={12} md={4}>
                <DeliveryAddress
                    setCustomer={props.setCustomer}
                    customer={props.customer}
                    shippingAddress={props.customer.shippingAddress}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <BillingData customer={props.customer} handleUpdateBillingData={props.handleUpdateBillingData} />
            </Grid>
            <Grid item xs={12} md={4}>
                <PaymentMethods
                    handleUpdatePaymentMethods={props.handleUpdatePaymentMethods}
                    paymentMethods={props.customer.paymentMethods}
                    customerId={props.customer.id}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <OtherInfo friendCode={props.customer.friendCode} />
            </Grid>
            <Grid item xs={12} md={4}>
                <CustomerWallet
                    wallet={props.customer.wallet}
                    customerPaymentMethods={props.customer.paymentMethods}
                    handleCreateWallet={props.handleCreateWallet}
                    handleUpdateWallet={props.handleUpdateWallet}
                    handleChargeMoney={props.handleChargeMoney}
                />
            </Grid>
        </>
    );
};

export default CustomerInfo;
