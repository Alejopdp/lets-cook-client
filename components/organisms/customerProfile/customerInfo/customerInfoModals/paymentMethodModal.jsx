// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import { Box, Typography } from "@material-ui/core";

// Internal components
import Input from "../../../../atoms/input/input";
import SelectInput from "../../../../atoms/selectInput/SelectInput";
import RoundedCheckbox from "../../../../atoms/roundedCheckbox/roundedCheckbox";

const PaymentMethodModal = (props) => {
    // const [formData, setFormData] = useState({

    // })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    console.log(props.customer)

    return (
        <Box marginRight={20}>
            <Typography variant="subtitle1">Método de pago actual</Typography>
            <Typography variant="body1" paragraph>{props.customer.creditCard} - Vencimiento {props.customer.cardExpirationDate} </Typography>

            <Typography variant="subtitle1">Nuevo método de pago</Typography>

            <RoundedCheckbox
                name="savedCards"
                label="Tarjetas guardadas del cliente"
                checked={props.checked}
                onChange={props.onChange}
            />

            <Box display="flex" flexDirection="column" marginLeft={4}>
                <RoundedCheckbox
                    name="savedCard1"
                    label="Visa terminada en 1234"
                    checked={props.checked}
                    onChange={props.onChange}
                />

                {props.customer.savedCards &&
                    props.customer.savedCards.map((savedCard, index) => (
                        <RoundedCheckbox
                            key={index}
                            name={`savedCard${index}`}
                            label={savedCard.creditCard}
                            // checked={props.checked}
                            // onChange={props.onChange}
                        />
                    ))
                }
            </Box>

        </Box>
    );
};

export default PaymentMethodModal;

PaymentMethodModal.propTypes = {

};
