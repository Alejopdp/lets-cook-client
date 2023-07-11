// Utils & config
import React from "react";
import { CircularProgress, useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Internal components
import CustomButton from "../../atoms/button/button";

// Images & icons
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
import AddIcon from "@material-ui/icons/Add";

interface ExportOption {
    title: string;
    handler: () => void;
    isSubmitting: boolean;
}

interface CustomerDashboardExportsProps {
    title: string;
    import: boolean;
    exports: ExportOption[];
    buttonText: string;
    handleClick: () => void;
    showCreateButton: boolean;
}

const CustomerDashboardExports = (props: CustomerDashboardExportsProps) => {
    const theme = useTheme();

    return (
        <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="lg" marginBottom={4}>
                <Typography variant="h5" color="textSecondary">
                    {props.title}
                </Typography>
                <div>
                    <Box display="flex" alignItems="center">
                        {props.exports.map((option, index) => (
                            <Box key={index} maxWidth={250} minWidth={220} display={"flex"} justifyContent={"center"} alignContent={"center"} marginX={1}> {option.isSubmitting ? <CircularProgress />:  <Button fullWidth size="large" startIcon={<GetAppIcon />} onClick={option.handler}>
                                {option.title || "Exportar CSV"}
                            </Button>}
                            </Box>
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

export default CustomerDashboardExports;
