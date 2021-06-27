// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Internal components
import Button from "../atoms/button/button";

// Icons & images
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
    marginTop: {
        paddingTop: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));

const NewPasswordForm = (props) => {
    const classes = useStyles();
    return (
        <form className={classes.form} onSubmit={props.handleSubmit}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{props.lang.passwordPlaceholder}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={props.showPassword ? "text" : "password"}
                    value={props.password}
                    onChange={props.handleChange("password")}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={props.handleClickShowPassword}
                                onMouseDown={props.handleMouseDownPassword}
                                edge="end"
                            >
                                {props.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={137}
                />
                <Typography variant="body2" className={classes.marginTop}>
                    {props.lang.passwordRules}
                </Typography>
            </FormControl>

            <div className={classes.btnDiv}>
                <Button variant="contained" size="large" disabled={props.isPassword ? false : true} onClick={props.handleSubmit}>
                    {props.lang.button}
                </Button>
            </div>
        </form>
    );
};

NewPasswordForm.propTypes = {
    isPassword: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    handleMouseDownPassword: PropTypes.func.isRequired,
    handleClickShowPassword: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    lang: PropTypes.exact({
        passwordPlaceholder: PropTypes.string.isRequired,
        passwordRules: PropTypes.string.isRequired,
        button: PropTypes.string.isRequired,
    }),
};

export default NewPasswordForm;
