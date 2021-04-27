// Utils & config
import React from "react";
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

const Success = () => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};

export default Success;
