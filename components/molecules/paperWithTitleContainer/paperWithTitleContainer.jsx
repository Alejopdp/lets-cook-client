// Utils & config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
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
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    displayFlex: {
        display: "flex",
        flexDirection: "column",
    },
}));

const PaperWithTitleContainer = (props) => {
    const { root, paper, displayFlex } = useStyles();
    const theme = useTheme();

    return (
        <Box className={root} width={props.fullWidth ? "100%" : props.width || 384}>
            <Box className={props.flex ? clsx(paper, displayFlex) : paper} height={props.height} marginBottom={props.marginBottom}>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    style={{ marginBottom: theme.spacing(2), fontSize: props.fontSize || "deafult" }}
                >
                    {props.title}
                </Typography>
                {props.children}
            </Box>
        </Box>
    );
};

PaperWithTitleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fullWidth: PropTypes.bool,
    flex: PropTypes.bool,
    fontSize: PropTypes.number,
    children: PropTypes.node.isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PaperWithTitleContainer;
