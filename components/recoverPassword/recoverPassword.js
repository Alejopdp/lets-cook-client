// Utils & config
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

// External components
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Link from 'next/link';

// Internal components
import { emailRegex } from '../../helpers/regex';

// Icons & Images
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
  image: {
    padding: theme.spacing(2)
  },
  center: {
    display: "flex",
    placeItems: "center",
    minHeight: "75vh"
  },
  root: {
    margin: "0 auto",
    alignItems: "center"
  },
  paper: {
    width: "384px",
    background: theme.palette.background.paper,
    padding: theme.spacing(4)
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
    width: '100%',
  },
}));

const RecoverPassword = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const isEmail = emailRegex.test(values.email);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  return (
    <>
      <div className={classes.image}>
        <Image
          src="/logo.png"
          width={164}
          height={56}
        />
      </div>

      <div className={classes.center}>
        <div className={classes.root}>
          <div className={classes.paper}>
            <Typography variant="subtitle1" color="textSecondary">
              Recuperar contraseña
            </Typography>

            <Typography variant="body2">
              Ingrese su correo electrónico a continuación y le enviaremos un email con un link para que pueda ingresar su nueva contraseña.
          </Typography>

            <form className={classes.form}>
              <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <TextField
                  id="outlined-basic"
                  label="Correo electrónico"
                  variant="outlined"
                  type="email"
                  onChange={handleChange('email')}
                />
              </FormControl>

              <div className={clsx(classes.btnDiv, classes.margin)}>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.btn}
                  disabled={isEmail ? false : true}
                // onSubmit={}
                >
                  Solicitar recuperación
              </Button>
              </div>

                <Typography variant="body2" color="primary">
                  <Link href="/">
                      Volver a Iniciar sesión
                  </Link>
                </Typography>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default RecoverPassword;