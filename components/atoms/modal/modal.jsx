// Utils & Config
import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// External Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: theme.palette.grey[500],
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const useStyles = makeStyles((theme) => ({
    primaryButtonClass: {
        '&.Mui-disabled': {
            opacity: '0.5'
        }
    }
}));


const Modal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            fullWidth={props.fullWidth || true}
            maxWidth={props.maxWidth || 'sm'}
            fullScreen={props.fullScreen ? fullScreen : false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={{ zIndex: '3147483647' }}
        >
            <DialogTitle id="alert-dialog-title" onClose={props.handleClose}>{props.title}</DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions style={{ padding: theme.spacing(3) }}>
                <Button onClick={props.handleSecondaryButtonClick ? props.handleSecondaryButtonClick : props.handleClose} style={{ textAlign: 'right', color: props.secondaryButtonColor ? props.secondaryButtonColor : theme.palette.text.secondary }}>
                    {props.secondaryButtonText}
                </Button>
                <Button className={classes.primaryButtonClass} disabled={props.disabled} onClick={props.handlePrimaryButtonClick} style={{ textAlign: 'right', color: props.primaryButtonColor ? props.primaryButtonColor : theme.palette.primary.main }} autoFocus>
                    {props.primaryButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Modal;