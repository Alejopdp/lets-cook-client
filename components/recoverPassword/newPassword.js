// Utils & config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Internal components
import { pswRegex } from "../../helpers/regex";

// Icons & Images
import Image from "next/image";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
    image: {
        padding: theme.spacing(2),
    },
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "75vh",
    },
    root: {
        margin: "0 auto",
    },
    paper: {
        width: "384px",
        background: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
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

const NewPassword = () => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    const isPassword = pswRegex.test(values.password);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <div className={classes.image}>
                <Image src="/logo.png" width={164} height={56} />
            </div>

            <div className={classes.center}>
                <div className={classes.root}>
                    <div className={classes.paper}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Recuperar contraseña
                        </Typography>

                        <form className={classes.form}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Nueva contraseña</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleChange("password")}
                                    // error={isPassword ? false : true}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={137}
                                />
                                <Typography variant="body2" className={classes.marginTop}>
                                    La contraseña deberá tener al menos 8 caracteres en total, una mayúscula y al menos 1 número.
                                </Typography>
                            </FormControl>

                            <div className={classes.btnDiv}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={classes.btn}
                                    disabled={isPassword ? false : true}
                                    // onSubmit={}
                                >
                                    Recuperar contraseña
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPassword;
