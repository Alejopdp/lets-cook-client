// Utils & config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

// Icons & Images
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Image from "next/image";

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
        width: "384px",
        background: theme.palette.background.paper,
        padding: theme.spacing(4),
    },
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

const Success = () => {
    const classes = useStyles();

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

                        <div className={classes.success}>
                            <CheckCircleIcon color="primary" style={{ fontSize: 70 }} />

                            <Typography variant="subtitle2" color="textSecondary">
                                Solicitud de recupero exitosa
                            </Typography>
                        </div>

                        <Typography variant="body2">
                            Hemos enviado un email al correo electrónico ingresado para que puedas ingresar tu nueva contraseña.
                        </Typography>

                        <form className={classes.form}>
                            <Typography variant="body2" color="primary">
                                <Link href="/">Volver a Iniciar sesión</Link>
                            </Typography>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Success;
