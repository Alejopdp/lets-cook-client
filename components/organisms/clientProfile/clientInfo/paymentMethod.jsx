// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Typography } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const PaymentMethods = (props) => {
    return (
        <PaperWithTitleContainer title="Método de pago">
            <Typography variant="subtitle2">Tarjeta</Typography>
            <Typography variant="body1" paragraph>{props.client.creditCard}</Typography>

            <Typography variant="subtitle2">Piso / Puerta / Aclaraciones</Typography>
            <Typography variant="body1" paragraph>{props.client.cardExpirationDate}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer"}}
                onClick={() => alert("Modificar método de pago")}
            >
                Modificar método de pago {" >"}
            </Typography>

        </PaperWithTitleContainer>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {

};
