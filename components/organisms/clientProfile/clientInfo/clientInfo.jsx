// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Box, Grid, Typography } from "@material-ui/core";

// Internal components
import PersonalData from "./personalData";
import DeliveryAddress from "./deliveryAddress";
import BillingData from "./billingData";
import PaymentMethods from "./paymentMethod";

const client = {
    // Personal data
    name: "Alejo",
    lastName: "Scotti",
    phone1: "+34 686 234 345",
    phone2: null,
    bornDate: null,
    preferredLanguage: "Español",
    // Delivery adress
    deliveryAddress: "Calle Ing Fausto Elio 42, 54001, Valencia",
    deliveryClarifications: "Piso 2, Puerta 10",
    deliveryPreferredSchedule: null,
    // Billing data
    billingAddress: "Calle Ing Fausto Elio 42, 54001, Valencia",
    billingClarifications: "Piso 2, Puerta 10",
    billingName: "Alejo Scotti",
    personalIdNumber: "39481743 V",
    // Payment method
    creditCard: "Visa terminada en 1234",
    cardExpirationDate: "08/12"
}


const ClientInfo = (props) => {
    return (
        <Grid container direction="row">
            <Grid item>
                <PersonalData client={client} />
            </Grid>

            <Grid item>
                <DeliveryAddress client={client} />
            </Grid>

            <Grid item>
                <BillingData client={client} />
            </Grid>

            <Grid item>
                <PaymentMethods client={client} />
            </Grid>
        </Grid>
    );
};

export default ClientInfo;

ClientInfo.propTypes = {

};
