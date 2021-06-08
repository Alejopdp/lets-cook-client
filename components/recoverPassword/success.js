// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Icons & Images
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(6),
    },
    success: {
        textAlign: "center",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
    },
}));

const Success = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.success}>
                <CheckCircleIcon color="primary" style={{ fontSize: 70 }} />

                <Typography variant="subtitle2" color="textSecondary">
                    {props.lang.title}
                </Typography>
            </div>

            <Typography variant="body2">{props.lang.text}</Typography>

            <form className={classes.form}>
                <Typography variant="body2" color="primary">
                    <Link href="/">{props.lang.login}</Link>
                </Typography>
            </form>
        </>
    );
};

export default Success;

Success.propTypes = {
    lang: PropTypes.exact({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
    }),
};
