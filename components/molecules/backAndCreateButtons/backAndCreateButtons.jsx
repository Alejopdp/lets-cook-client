// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";

const BackAndCreateButtons = (props) => {
    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box marginRight={2}>
                <Button onClick={props.backButtonHandler} variant="text">
                    VOLVER
                </Button>
            </Box>
            <CreateButton onClick={props.createButtonHandler} disabled={props.isCreateButtonDisabled}>
                {props.createButtonText}
            </CreateButton>
        </Box>
    );
};

BackAndCreateButtons.propTypes = {
    createButtonText: PropTypes.string.isRequired,
    backButtonHandler: PropTypes.func.isRequired,
    createButtonHandler: PropTypes.func.isRequired,
    isCreateButtonDisabled: PropTypes.bool,
};

export default BackAndCreateButtons;
