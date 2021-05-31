import PropTypes from 'prop-types';
import {
    Button,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@material-ui/core";

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

const ComplexModal = ({
    title,
    component,
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = () => {},
    handleCancelButton = () => {},
    open,
    handleClose = () => {},
}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {component}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirmButton} className={classes.primaryColor}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ComplexModal.propTypes = {
    title: PropTypes.string,
    component: PropTypes.element,
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    handleConfirmButton: PropTypes.func,
    handleCancelButton: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,

};

export default ComplexModal;