// Utils & config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        alignItems: "center",
    },
    paper: {
        background: theme.palette.background.paper,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const PaperWithTitleContainer = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box className={classes.root} width={props.width || 384}>
            <div className={classes.paper}>
                <Typography variant="subtitle1" color="textSecondary" style={{ marginBottom: theme.spacing(3) }}>
                    {props.title}
                </Typography>
                {props.children}
            </div>
        </Box>
    );
};

PaperWithTitleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number,
};

export default PaperWithTitleContainer;
