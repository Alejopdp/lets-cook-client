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
import AddIcon from "@material-ui/icons/Add";

interface ExportOption {
    title: string;
    handler: () => void;
}

interface DashboardTitleWithButtonAndManyCSVProps {
    title: string;
    import: boolean;
    exports: ExportOption[];
    importText?: string;
    handleClickImport: (e: any) => void;
    importFile: any;
    buttonText: string;
    handleClick: () => void;
    showCreateButton: boolean;
}

const DashboardTitleWithButtonAndManyCSV = (props: DashboardTitleWithButtonAndManyCSVProps) => {
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
                    <Box display="flex" alignItems="center">
                        {props.exports.map((option, index) => (
                            <Button key={index} size="large" startIcon={<GetAppIcon />} onClick={option.handler}>
                                {option.title || "Exportar CSV"}
                            </Button>
                        ))}
                        {props.showCreateButton && (
                            <CustomButton onClick={props.handleClick} startIcon={<AddIcon />}>
                                {props.buttonText}
                            </CustomButton>
                        )}
                    </Box>
                </div>
            </Box>
        </Grid>
    );
};

export default DashboardTitleWithButtonAndManyCSV;
