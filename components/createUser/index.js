// Utils & config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

// Internal components
import { emailRegex } from "../../helpers/regex";

const roles = [
    {
        label: "Administrador",
        value: "admin",
    },
    {
        label: "Moderador",
        value: "mod",
    },
    {
        label: "Operador",
        value: "op",
    },
    {
        label: "Usuario",
        value: "user",
    },
];

const useStyles = makeStyles((theme) => ({
    center: {
        display: "flex",
        placeItems: "center",
        minHeight: "55vh",
        margin: "0 auto",
    },
    root: {
        margin: "0 auto",
        alignItems: "center",
        placeItems: "center",
    },
    paper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(4),
        placeItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "364px",
    },
    btnDiv: {
        display: "flex",
        justifyContent: "flex-end",
        paddingTop: theme.spacing(2),
    },
    btn: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
    },
    backBtn: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));

const CreateUser = () => {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: "",
        lastName: "",
        email: "",
        rol: "",
    });

    const isEmail = emailRegex.test(values.email);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleDisable = () => {};

    return (
        <>
            <div className={classes.center}>
                <div className={classes.root}>
                    <div className={classes.paper}>
                        <Typography variant="subtitle1" color="textSecondary">
                            Datos del usuario
                        </Typography>

                        <form className={classes.form}>
                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <TextField id="outlined-basic" label="Nombre" variant="outlined" onChange={handleChange("name")} />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <TextField id="outlined-basic" label="Apellido" variant="outlined" onChange={handleChange("lastName")} />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <TextField
                                    id="outlined-basic"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    type="email"
                                    onChange={handleChange("email")}
                                />
                            </FormControl>

                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <TextField select label="Rol" value={values.rol} onChange={handleChange("rol")} variant="outlined">
                                    {roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                        </form>

                        <div className={classes.btnDiv}>
                            <Button variant="contained" size="large" className={classes.btn} disabled={handleDisable()}>
                                Crear usuario
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateUser;
