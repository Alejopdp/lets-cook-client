// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { PaymentMethodsModalProps } from "../../interface";

// External components
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@material-ui/core";

// Internal components

// Images & icons
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const PaymentMethodModal = (props: PaymentMethodsModalProps) => {
    return (
        <Box marginRight={20}>
            {props.defaultPaymentMethod && (
                <>
                    <Typography variant="subtitle1">Método de pago actual</Typography>
                    {props.defaultPaymentMethod.id === "wallet" ? (
                        <Typography variant="body1" paragraph>
                            Utilizando monedero
                        </Typography>
                    ) : (
                        <Typography variant="body1" paragraph>
                            {props.defaultPaymentMethod.card} - Vencimiento {props.defaultPaymentMethod.expirationDate}{" "}
                        </Typography>
                    )}
                </>
            )}
            <Typography variant="subtitle1">Nuevo método de pago</Typography>

            <FormControl component="fieldset" style={{ width: "100%" }}>
                <FormControlLabel
                    value="card"
                    checked={
                        props.selectedPaymentMethodId !== "wallet" &&
                        props.paymentMethods.some((pm) => pm.id === props.selectedPaymentMethodId)
                    }
                    onClick={(e) => props.handlePaymentMethodChange(props.paymentMethods[0].id)}
                    control={
                        <Radio
                            checked={
                                props.selectedPaymentMethodId !== "wallet" &&
                                props.paymentMethods.some((pm) => pm.id === props.selectedPaymentMethodId)
                            }
                        />
                    }
                    label="Tarjetas guardads del cliente"
                />
                <RadioGroup
                    aria-label="gender"
                    name="savedCards"
                    value={props.selectedPaymentMethodId}
                    onChange={(e) => props.handlePaymentMethodChange(e.target.value)}
                    style={{ marginLeft: "2rem" }}
                >
                    {props.paymentMethods
                        .filter((pm) => pm.id !== "wallet")
                        .map((paymentMethod) => (
                            <FormControlLabel
                                value={paymentMethod.id}
                                control={<Radio />}
                                label={`${paymentMethod.card} ${paymentMethod.expirationDate}`}
                            />
                        ))}
                </RadioGroup>
            </FormControl>
            {props.paymentMethods.some((pm) => pm.id === "wallet") && (
                <FormControl component="fieldset" style={{ width: "100%" }}>
                    <FormControlLabel
                        value="wallet"
                        checked={props.selectedPaymentMethodId === "wallet"}
                        control={<Radio checked={props.selectedPaymentMethodId === "wallet"} />}
                        label="Utilizar monedero"
                        onChange={(e) => props.handlePaymentMethodChange("wallet")}
                    />
                </FormControl>
            )}

            <div style={{ display: "flex", marginTop: ".7rem", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "red", marginRight: 8 }} />
                <i style={{ marginLeft: ".2rem", fontStyle: "italic" }}>El método de pago se modificara en todos los planes activos</i>
            </div>
        </Box>
    );
};

export default PaymentMethodModal;

PaymentMethodModal.propTypes = {};
