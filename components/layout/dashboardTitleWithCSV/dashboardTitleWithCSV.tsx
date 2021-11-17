// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Internal components
import CustomButton from "../../atoms/button/button";

// Images & icons
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";

interface DashboardTitleWithCSVProps {
    title: string;
    import: boolean;
    export: boolean;
    importText?: string;
    exportText?: string;
    handleClickImport: (e: any) => void;
    handleClickExport: () => void;
    importFile: any;
}

const DashboardTitleWithCSV = (props: DashboardTitleWithCSVProps) => {
    const theme = useTheme();
    // TODO: Usar este componente en usersDashboard.jsx

    return (
        <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="lg" marginBottom={4}>
                <Typography variant="h5" color="textSecondary">
                    {props.title}
                </Typography>
                <div>
                    {props.import && (
                        <Button
                            size="large"
                            startIcon={<PublishIcon />}
                            // onClick={props.handleClickImport}
                            style={{ marginRight: theme.spacing(2) }}
                            component="label"
                        >
                            {props.importText || "Importar CSV"}
                            <input type="file" hidden onChange={props.handleClickImport} value={props.importFile} />
                        </Button>
                    )}
                    {props.export && (
                        <Button size="large" startIcon={<GetAppIcon />} onClick={props.handleClickExport}>
                            {props.exportText || "Exportar CSV"}
                        </Button>
                    )}
                </div>
            </Box>
        </Grid>
    );
};

export default DashboardTitleWithCSV;
