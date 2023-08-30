import PropTypes from "prop-types";
import { Button, makeStyles, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    primaryColor: {
        color: theme.palette.primary.main,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

type CompleModalProps = {
    title: string;
    component: React.ReactNode;
    cancelButtonText: string;
    confirmButtonText: string;
    handleConfirmButton: () => void;
    handleCancelButton: () => void;
    open: boolean;
    handleClose: () => void;
    isConfirmButtonDisabled: boolean;
    maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    fullWidth: boolean | undefined;
};

const ComplexModal = ({
    title,
    component,
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = () => {},
    handleCancelButton = () => {},
    open,
    handleClose = () => {},
    isConfirmButtonDisabled,
    maxWidth,
    fullWidth,
}: CompleModalProps) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{component}</DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirmButton} className={classes.primaryColor} disabled={isConfirmButtonDisabled}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ComplexModal;
