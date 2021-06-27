// Utils & config
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Link from "next/link";
import FormGroup from "@material-ui/core/FormGroup";

// Internal components
import Button from "../atoms/button/button";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        paddingTop: theme.spacing(2),
    },
    btnDiv: {
        display: "flex",
        justifyContent: "flex-end",
    },
    btn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
    },
    margin: {
        paddingBottom: theme.spacing(2),
    },
    textField: {
        width: "100%",
    },
}));

const RecoverPasswordForm = (props) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant="body2">{props.lang.text}</Typography>

            <form className={classes.form} onSubmit={props.handleSubmit}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label={props.lang.emailPlaceholder}
                        variant="outlined"
                        type="email"
                        onChange={props.handleChange("email")}
                    />
                </FormControl>

                <div className={clsx(classes.btnDiv, classes.margin)}>
                    <Button variant="contained" size="large" disabled={props.isEmail ? false : true} onClick={props.handleSubmit}>
                        {props.lang.button}
                    </Button>
                </div>

                <Typography variant="body2" color="primary">
                    <Link href="/">{props.lang.login}</Link>
                </Typography>
            </form>
        </>
    );
};

RecoverPasswordForm.propTypes = {
    isEmail: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    lang: PropTypes.exact({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        emailPlaceholder: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
        login: PropTypes.string.isRequired,
    }),
};

export default RecoverPasswordForm;
