// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";

const RefundModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title="Reembolso"
            primaryButtonText="reembolsar"
            primaryButtonColor="#FC1919"
            secondaryButtonText="cancelar"
        >
            <Typography variant="body1" color="textSecondary" style={{ fontSize: "16px" }}>
                ¿Estás seguro de que quieres reembolsar <b>{props.amountToRefund} €</b>?
            </Typography>
        </Modal>
    );
};

export default RefundModal;
