// Utils & config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { createUser, updateUser } from "../../../../helpers/serverRequests/user";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
const langs = require("../../../../lang").createUser;

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

// Internal components
import { emailRegex } from "../../../../helpers/regex";
import CreateButton from "../../../atoms/createButton/createButton";

const useStyles = makeStyles((theme) => ({
    paper: {
        background: theme.palette.background.paper,
        padding: theme.spacing(4),
        placeItems: "center",
        width: "384px",
        margin: "0 auto",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
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
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: "100%",
    },
}));

const CreateUser = (props) => {
    const classes = useStyles();
    const router = useRouter();
    var lang = langs[router.locale];
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [values, setValues] = useState({
        firstName: props.user.firstName || "",
        lastName: props.user.lastName || "",
        email: props.user.email || "",
        role: props.user.role || "",
    });

    const isEmail = emailRegex.test(values.email);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleDisableCreation = () => {
        return !values.firstName || !values.lastName || !values.email || !values.role || !isEmail;
    };

    const handleDisableUpdate = () => {
        return !values.firstName || !values.lastName || !values.role;
    };

    const handleCreateUser = async () => {
        const res = await createUser(values);

        if (res.status === 200) {
            enqueueSnackbar("Se ha creado el usuario correctamente", {
                variant: "success",
            });
            router.push("/gestion-de-usuarios");
        } else {
            enqueueSnackbar(res.data.message, {
                variant: "error",
            });
        }
    };

    const handleUpdateUser = async () => {
        const res = await updateUser({ ...values, id: props.user.id });

        if (res.status === 200) {
            enqueueSnackbar("Se ha modificado el usuario correctamente", {
                variant: "success",
            });
            router.push("/gestion-de-usuarios");
        } else {
            enqueueSnackbar("Error al modificar el usuario", {
                variant: "error",
            });
        }
    };

    return (
        <div className={classes.paper}>
            <Typography variant="subtitle1" color="textSecondary">
                {lang.title}
            </Typography>

            <form className={classes.form}>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label={lang.firstNamePlaceholder}
                        variant="outlined"
                        onChange={handleChange("firstName")}
                        value={values.firstName}
                    />
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label={lang.lastNamePlaceholder}
                        variant="outlined"
                        onChange={handleChange("lastName")}
                        value={values.lastName}
                    />
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <TextField
                        id="outlined-basic"
                        label={lang.emailPlaceholder}
                        variant="outlined"
                        type="email"
                        disabled={!props.creation}
                        onChange={handleChange("email")}
                        value={values.email}
                    />
                </FormControl>

                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <TextField select label={lang.role} value={values.role} onChange={handleChange("role")} variant="outlined">
                        {props.roles.map((option) => (
                            <MenuItem key={option.title} value={option.title}>
                                {option.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </form>

            <div className={classes.btnDiv}>
                <CreateButton
                    variant="contained"
                    size="large"
                    className={classes.btn}
                    disabled={props.creation ? handleDisableCreation() : handleDisableUpdate()}
                    onClick={props.creation ? handleCreateUser : handleUpdateUser}
                >
                    {props.buttonText}
                </CreateButton>
            </div>
        </div>
    );
};

CreateUser.propTypes = {
    buttonText: PropTypes.string.isRequired,
    creation: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CreateUser;
