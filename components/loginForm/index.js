// Utils & config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { login } from "../../helpers/serverRequest/user";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Internal components
import { emailRegex, pswRegex } from "../../helpers/regex";

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
        alignItems: "center",
    },
    paper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: "384px",
    },
    btnDiv: {
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        marginTop: theme.spacing(1),
    },
    btn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
    },
    margin: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));

const LoginForm = () => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const [clientErrors, setclientErrors] = React.useState({});

    const [serverError, setserverError] = React.useState(false);

    const isEmail = emailRegex.test(values.email);
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

    const isEmailInValid = () => {
        return !isEmail && values.email !== "";
    };

    const handleSubmit = async () => {
        const res = await login(values.email, values.password);

        if (res.status === 200) {
            alert("Login exitoso");
        } else if (res.status === 400) {
            setclientErrors(res.data);
            // {
            //   email: "El mensaje de error",
            //   nombre: "El mensaje de error"
            // }
        } else {
            alert("Falló el login papaa");
            //setservererror(true)
        }
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
                            Iniciar sesión
                        </Typography>

                        <form className={classes.form}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <TextField
                                    id="outlined-basic"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    type="email"
                                    onChange={handleChange("email")}
                                    // error={isEmail ? false : true}
                                    error={isEmailInValid() ? true : clientErrors.email ? true : false}
                                    // helperText={isEmail ? null : "Insert valid email"}
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
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
                                    labelWidth={85}
                                />
                            </FormControl>

                            <Typography variant="body2" color="primary">
                                <Link href="/recupero-de-contrasena">Olvidé mi contraseña</Link>
                            </Typography>

                            <div className={classes.btnDiv}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    className={classes.btn}
                                    disabled={isEmail && isPassword ? false : true}
                                    // onSubmit={}
                                >
                                    Ingresar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
