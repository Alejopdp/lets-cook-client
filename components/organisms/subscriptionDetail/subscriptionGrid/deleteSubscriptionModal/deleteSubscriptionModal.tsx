// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { CancellationReason } from "types/cancellation";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const DeleteSubscriptionModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title="Eliminar subscripción"
            primaryButtonText="Eliminar subscripción"
            primaryButtonColor="#FC1919"
            secondaryButtonText="cerrar"
            fullScreen
        >
            <Typography variant="body1" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                ¿Estás seguro de que quieres eliminar la subscripción? Se perderá cualquier información sobre la misma.
            </Typography>
        </Modal>
    );
};

export default DeleteSubscriptionModal;
