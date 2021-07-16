// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import { Button, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from "@material-ui/core";

// Internal components
import CustomCheckbox from "../../atoms/checkbox/checkbox";

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

const AddProductsModal = ({
    title,
    plans = [],
    selectedPlans = [],
    cancelButtonText,
    confirmButtonText,
    handleConfirmButton = () => {},
    handleCancelButton = () => {},
    open,
    handleClose = () => {},
}) => {
    const classes = useStyles();
    const [selectedItems, setselectedItems] = useState(selectedPlans);

    const handleChange = (plan) => {
        if (selectedItems.some((item) => item.id === plan.id)) {
            setselectedItems(selectedItems.filter((item) => item.id !== plan.id));
        } else {
            setselectedItems([...selectedItems, plan]);
        }
    };

    const handleConfirmModal = () => {
        handleConfirmButton(selectedItems);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={500}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
                {plans.map((plan, index) => (
                    <Box key={index} display="flex" alignItems="center">
                        <CustomCheckbox
                            label={plan.name}
                            value={plan.id}
                            name={plan.name}
                            checked={selectedItems.some((item) => item.id === plan.id)}
                            handleChange={(e) => {
                                handleChange(plan);
                            }}
                        />
                        <Typography variant="body1" color="initial" style={{ fontSize: 12 }}>
                            {plan.type}
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelButton} color="default" autoFocus>
                    {cancelButtonText}
                </Button>
                <Button onClick={handleConfirmModal} className={classes.dangerColor}>
                    {confirmButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddProductsModal.propTypes = {
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    cancelButtonText: PropTypes.string,
    confirmButtonText: PropTypes.string,
    handleConfirmButton: PropTypes.func,
    handleCancelButton: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
};

export default AddProductsModal;
