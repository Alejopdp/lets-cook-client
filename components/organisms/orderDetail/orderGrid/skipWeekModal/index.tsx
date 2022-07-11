// Utils & Config
import React from "react";
import { useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";

interface SkipWeekModalProps {
    open: boolean;
    handleClose: () => void;
    handlePrimaryButtonClick: () => void;
    isOrderSkipped: boolean;
    isSubmitting: boolean;
}

const SkipWeekModal = (props: SkipWeekModalProps) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title={props.isOrderSkipped ? "Reactivar semana" : "Saltar semana"}
            primaryButtonText={props.isOrderSkipped ? "Reactivar semana" : "Saltar semana"}
            primaryButtonColor={theme.palette.secondary.main}
            secondaryButtonText="cancelar"
            disabled={props.isSubmitting}
            handleSecondaryButtonClick={props.handleClose}
        >
            <Typography variant="body1" color="textSecondary" style={{ fontSize: "16px" }}>
                ¿Estás seguro de que deseas {props.isOrderSkipped ? "reactivar" : "saltar"} la semana?
            </Typography>
        </Modal>
    );
};

export default SkipWeekModal;
