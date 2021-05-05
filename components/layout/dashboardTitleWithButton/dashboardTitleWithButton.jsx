// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import Button from "../../atoms/button/button";

// Images & icons

const DasboardWithButton = (props) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h2">{props.title}</Typography>
            <Button onClick={props.handleClick}>{props.buttonText}</Button>
        </Box>
    );
};

DasboardWithButton.propTypes = {
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default DasboardWithButton;
