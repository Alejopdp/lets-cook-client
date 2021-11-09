import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "components/atoms/modal/modal";
import { Typography } from "@material-ui/core";

interface MoveShippingDateModal {
    open: boolean;
    handleClose: () => void;
    handlePrimaryButtonClick: () => void;
}

const MoveShippingDateModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title="Adelantar orden"
            primaryButtonText="ADELANTAR"
            primaryButtonColor={theme.palette.secondary.main}
            secondaryButtonText="CANCELAR"
        >
            <Typography variant="body1" color="textSecondary" style={{ fontSize: "16px" }}>
                ¿Estás seguro de que deseas adelantar la orden? Las próximas entregas y cobros también se adelantarán.
            </Typography>
        </Modal>
    );
};

export default MoveShippingDateModal;
