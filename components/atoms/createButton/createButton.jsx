// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components

// Internal components
import Button from "../button/button";

// Images & Icons
import AddIcon from "@material-ui/icons/Add";

const CreateButton = (props) => {
    return (
        <Button
            variant={props.variant || "contained"}
            size={props.size}
            disabled={props.disabled}
            onClick={props.onClick}
            fullWidth={props.fullWidth}
            startIcon={<AddIcon />}
        >
            {props.children}
        </Button>
    );
};

CreateButton.propTypes = {
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
    variant: PropTypes.any,
    onClick: PropTypes.func.isRequired,
    fullWidth: PropTypes.bool,
};

export default CreateButton;
