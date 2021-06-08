// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import CustomButton from "../../atoms/button/button";

// Images & icons
import AddIcon from "@material-ui/icons/Add";


const DashboardWithButton = (props) => {

    // TODO: Usar este componente en usersDashboard.jsx

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" width="lg" marginBottom={4}>
            <Typography variant="h5" color="textSecondary">{props.title}</Typography>

            <CustomButton
                onClick={props.handleClick}
                startIcon={props.startIcon ? <AddIcon /> : null}
            >
                {props.buttonText}
            </CustomButton>
        </Box>
    );
};

DashboardWithButton.propTypes = {
    title: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
};

export default DashboardWithButton;
