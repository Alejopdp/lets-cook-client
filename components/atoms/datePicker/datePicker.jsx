// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// External Components
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

const DatePicker = () => {
  const classes = useStyles();

  return (
    <FormControl className={classes.container} variant="outlined">
        <TextField
            id="date"
            label="Fecha de nacimiento"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
        />
    </FormControl>
  );
}

export default DatePicker;