// Utils & config
import React from "react";
import { CircularProgress, useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Images & icons
import GetAppIcon from "@material-ui/icons/GetApp";

interface ExportOption {
    title: string;
    handler: () => void;
    isSubmitting: boolean;
}

interface SubscriptionDashboardExportsProps {
    title: string;
    import: boolean;
    exports: ExportOption[];
    importText?: string;
    handleClickImport: (e: any) => void;
    importFile: any;
}

const SubscriptionDashboardExports = (props: SubscriptionDashboardExportsProps) => {

    return (
        <Grid item xs={12}>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="lg" marginBottom={4}>
                <Typography variant="h5" color="textSecondary">
                    {props.title}
                </Typography>
                <div>
                    <Box display="flex" alignItems="center">
                        {props.exports.map((option, index) => (
                            <Box key={index} minWidth={270} maxWidth={320}  display={"flex"} justifyContent={"center"} alignContent={"center"} marginX={1}>{option.isSubmitting ? <CircularProgress /> : <Button fullWidth key={index} size="large" startIcon={<GetAppIcon />} onClick={() => option.handler()}>
                                {option.title || "Exportar CSV"}
                            </Button>}</Box>
                        ))}
                    </Box>
                </div>
            </Box>
        </Grid>
    );
};

export default SubscriptionDashboardExports;
