// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Button } from "@material-ui/core";
import { exportRecipesRatings } from "helpers/serverRequests/recipe";

const CreateDashboardTitleWithExport = (props) => {
    const [isExporting, setIsExporting] = React.useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        await exportRecipesRatings()
        setIsExporting(false);
    }

    return (
        <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">{props.dashboardTitle}</Typography>
                <Box display={"flex"}><Button disabled={isExporting} style={{marginRight: 16}} size="large" startIcon={<GetAppIcon />} onClick={handleExport} >
                                {"Exportar Valoraciones"}
                            </Button>
                    <CreateButton onClick={props.handleCreateButton} disabled={props.isButtonDisabled}>
                        {props.createButtonText}
                    </CreateButton>
                    </Box>
            </Box>
        </Grid>
    );
};

CreateDashboardTitleWithExport.propTypes = {
    handleCreateButton: PropTypes.func.isRequired,
    createButtonText: PropTypes.string.isRequired,
    dashboardTitle: PropTypes.string.isRequired,
    showCreateButton: PropTypes.bool,
    isButtonDisabled: PropTypes.bool,
};

export default CreateDashboardTitleWithExport;
