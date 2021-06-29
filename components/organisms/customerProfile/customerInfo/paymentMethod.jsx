// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

// External components
import { Typography } from "@material-ui/core";
import PaymentMethodModal from "./customerInfoModals/paymentMethodModal";
import ComplexModal from "../../../molecules/complexModal/complexModal";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";

const PaymentMethods = (props) => {
    const [isPaymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleModifyPaymentMethod = () => {
        const res = { status: 200 };

        if (res.status === 200) {
            setPaymentMethodModalOpen(false);
            enqueueSnackbar("Método de pago modificado", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("No se ha podido modificar el método de pago", {
                variant: "error",
            });
            setPaymentMethodModalOpen(false);
        }
    };

    return (
        <>
        <PaperWithTitleContainer title="Método de pago">
            <Typography variant="subtitle2">Tarjeta</Typography>
            <Typography variant="body1" paragraph>{props.customer.creditCard}</Typography>

            <Typography variant="subtitle2">Vencimiento</Typography>
            <Typography variant="body1" paragraph>{props.customer.cardExpirationDate}</Typography>

            <Typography
                variant="subtitle2"
                color="primary"
                style={{ textTransform: "uppercase", cursor: "pointer"}}
                onClick={() => setPaymentMethodModalOpen(true)}
            >
                Modificar método de pago {" >"}
            </Typography>

        </PaperWithTitleContainer>

        {isPaymentMethodModalOpen &&
            <ComplexModal
                title="Modificar método de pago"
                component={<PaymentMethodModal customer={props.customer} />}
                open={isPaymentMethodModalOpen}
                cancelButtonText="Cancelar"
                confirmButtonText="Modificar método de pago"
                handleCancelButton={() => setPaymentMethodModalOpen(false)}
                handleConfirmButton={handleModifyPaymentMethod}
            />
        }
        </>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {

};
