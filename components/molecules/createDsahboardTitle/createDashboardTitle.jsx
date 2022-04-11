// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";

const CreateDashboardTitle = (props) => {
    return (
        <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">{props.dashboardTitle}</Typography>
                {props.showCreateButton ? (
                    <CreateButton onClick={props.handleCreateButton} disabled={props.isButtonDisabled}>
                        {props.createButtonText}
                    </CreateButton>
                ) : (
                    <></>
                )}
            </Box>
        </Grid>
    );
};

CreateDashboardTitle.propTypes = {
    handleCreateButton: PropTypes.func.isRequired,
    createButtonText: PropTypes.string.isRequired,
    dashboardTitle: PropTypes.string.isRequired,
    hideButton: PropTypes.bool,
    isButtonDisabled: PropTypes.bool,
};

export default CreateDashboardTitle;
