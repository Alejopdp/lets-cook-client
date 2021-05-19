// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components

// Images & Icons
import Info from "@material-ui/icons/Info";

const FormEmpty = (props) => {
    return (
        <Box display="flex" alignItems="center" marginY={2}>
            <Info style={{ color: "#E29C00", marginRight: 8 }} />
            <Typography variant="body1">{props.text}</Typography>
        </Box>
    );
};

FormEmpty.propTypes = {
    text: PropTypes.string.isRequired,
};

export default FormEmpty;
