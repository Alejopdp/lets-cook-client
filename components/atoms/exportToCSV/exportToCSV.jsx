// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// External components
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    text: {
        textTransform: "uppercase",
        cursor: "pointer",
        marginRight: theme.spacing(3)
    }
}));

const ExportToCSV = (props) => {
    const { text } = useStyles();

    return (
        <Typography
            variant="subtitle1"
            className={text}
            onClick={props.handleExportToCSV}
        >
            Exportar a CSV
        </Typography>
    )
};

ExportToCSV.propTypes = {
    handleExportToCSV: PropTypes.func
}

export default ExportToCSV;
