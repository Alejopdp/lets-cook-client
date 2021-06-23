// Utils & Config
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// External components
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const languages = [
    {
        value: 'EN',
        label: 'Inglés',
    },
    {
        value: 'ES',
        label: 'Español',
    },
    {
        value: 'CA',
        label: 'Catalán',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: "100%",
        },
    },
}));

const SelectInput = (props) => {
    const classes = useStyles();
    const [language, setLanguage] = useState('ES');

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                id="outlined-select-currency"
                select
                label="Idioma de preferencia"
                value={language}
                onChange={handleChange}
                variant="outlined"
            >
                {languages.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </form>
    );
}

export default SelectInput;