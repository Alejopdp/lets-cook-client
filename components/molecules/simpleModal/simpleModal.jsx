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
    dangerColor: {
        color: theme.palette.text.danger,
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

const SimpleModal = ({
    title,
    paragraphs = [],
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
                {paragraphs.map((paragraph, index) => (
                    <DialogContentText key={index}>
                        {paragraph}
                    </DialogContentText>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirmButton} className={classes.dangerColor}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

SimpleModal.propTypes = {
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    handleConfirmButton: PropTypes.func,
    handleCancelButton: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default SimpleModal;