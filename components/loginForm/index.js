import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

// boton fuera del form
// mejorar ux en validaciones

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    placeItems: "center",
    minHeight: "100vh"
  },
  root: {
    margin: "0 auto",
    alignItems: "center"
  },
  paper: {
    background: theme.palette.background.paper,
    padding: theme.spacing(4)
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  btnDiv: {
    display: "flex",
    justifyContent: "flex-end",
    flexWrap: "wrap"
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
    width: '100%',
  },
}));

const LoginForm = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    console.log(values)
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);
  const isPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(values.password);

  return (
    <div className={classes.center}>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography variant="subtitle1">
            Iniciar sesión
          </Typography>

          <form className={classes.form}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Correo electrónico"
                variant="outlined"
                type="email"
                onChange={handleChange('email')}
              // error={isEmail ? false : true}
              // helperText={isEmail ? null : "Insert valid email"}
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
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
              Olvidé mi contraseña
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
  )
};

export default LoginForm;