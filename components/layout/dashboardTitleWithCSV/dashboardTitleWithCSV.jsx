// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Internal components
import CustomButton from "../../atoms/button/button";

// Images & icons
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

const DashboardTitleWithCSV = (props) => {
    const theme = useTheme();
    // TODO: Usar este componente en usersDashboard.jsx

    return (
        <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="lg" marginBottom={4}>
                <Typography variant="h5" color="textSecondary">{props.title}</Typography>
                <div>
                    {props.import && (
                        <Button size="large" startIcon={<PublishIcon />} onClick={props.handleClickImport} style={{ marginRight: theme.spacing(2) }}>
                            Importar CSV
                    </Button>
                    )}
                    {props.export && (
                        <Button size="large" startIcon={<GetAppIcon />} onClick={props.handleClickExport} >
                            Exportar CSV
                    </Button>
                    )}
                </div>
                {/* <CustomButton
                onClick={props.handleClick}
                startIcon={props.startIcon ? <AddIcon /> : null}
            >
                {props.buttonText}
            </CustomButton> */}
            </Box>
        </Grid>
    );
};

DashboardTitleWithCSV.propTypes = {

};

export default DashboardTitleWithCSV;
