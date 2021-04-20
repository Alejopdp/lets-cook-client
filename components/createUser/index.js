import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const roles = ['Administrador', 'Moderador', 'Usuario', 'Operador'];

const useStyles = makeStyles((theme) => ({
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
    alignItems: "center",
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
    margin: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  center: {
    display: "flex",
    placeItems: "center",
    minHeight: "100vh"
  }
}));

const CreateUser = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: '',
  });

  const [rol, setRol] = React.useState('Operador');

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleRol = (event) => {
    setRol(event.target.value);
  };

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email);

  return (
    <div className={classes.center}>
      <div className={classes.root}>
        <div className={classes.paper}>
          <Typography variant="subtitle1">
            Datos del usuario
          </Typography>

          <form className={classes.form}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Correo electrónico"
                variant="outlined"
                type="email"
                onChange={handleChange('email')}
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              <TextField
                  select
                  label="Rol"
                  value={rol}
                  onChange={handleRol}
                  variant="outlined"
                >
                  {roles.map((userRol) => (
                    <MenuItem key={userRol}>
                      {userRol}
                    </MenuItem>
                  ))}
                </TextField>
            </FormControl>
          </form>

          <div className={classes.btnDiv}>
            <Button
              variant="contained"
              size="large"
              className={classes.btn}
              disabled={isEmail && isPassword ? false : true}
            >
              Crear usuario
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CreateUser;