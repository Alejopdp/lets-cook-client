// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// External components
import { Typography, Box } from "@material-ui/core";
import { CsvIco } from "../csvIco/csvIco";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    ico: {
        height: "16px",
        width: "16px"
    },
    text: {
        textTransform: "uppercase",
        cursor: "pointer",
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
}));

const ExportToCSV = (props) => {
    const { container, ico, text } = useStyles();

    return (
        <Box onClick={props.handleExportToCSV} className={container}>
            <CsvIco
                // className={ico}
            />

            <Typography variant="subtitle1" className={text}>
                Exportar a CSV
            </Typography>
        </Box>
    )
};

ExportToCSV.propTypes = {
    handleExportToCSV: PropTypes.func
}

export default ExportToCSV;
