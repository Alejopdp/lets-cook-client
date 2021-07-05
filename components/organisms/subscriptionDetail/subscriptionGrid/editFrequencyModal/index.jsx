// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import DataDisplay from '../../../../molecules/dataDisplay/dataDisplay';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
}));


const EditFrequencyModal = (props) => {

    const frequencyData = {
        frequencies: [
            { id: 1, value: 'one-time', text: 'Por única vez' },
            { id: 2, value: 'bi-weekly', text: 'Quincenal' },
            { id: 3, value: 'monthly', text: 'Mensual' },
        ]
    }

    const theme = useTheme();
    const classes = useStyles();
    const [frequencySelected, setFrequencySelected] = useState('');


    useEffect(() => {
        setFrequencySelected('')
    }, [props.open]);

    const handleChangeFrequency = event => {
        let value = event.target.value;
        setFrequencySelected(value)
    }

    const handleSubmitFrequency = () => {
        props.handlePrimaryButtonClick(frequencySelected)
    }

    const handleDisabled = () => {
        if (frequencySelected == '') {
            return true;
        } else {
            return false;
        }
    }

    

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitFrequency}
            title='Modificar frequencia'
            primaryButtonText='Modificar frequencia'
            secondaryButtonText='cerrar'
            fullScreen
            disabled={handleDisabled()}
        >
            <DataDisplay title='Variante actual' text='3 recetas para 3 personas' style={{ marginBottom: theme.spacing(3) }} />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Nueva variante</InputLabel>
                <Select
                    native
                    value={frequencySelected}
                    onChange={handleChangeFrequency}
                    label="Nueva variante"
                    inputProps={{ name: 'planVariantId', id: 'outlined-age-native-simple' }}
                >
                    <option key='0' value=''></option>
                    {frequencyData.frequencies.map(frecuency => (
                        <option key={frecuency.id} value={frecuency.value}>{frecuency.text}</option>
                    ))}
                </Select>
            </FormControl>
        </Modal>
    );
}

export default EditFrequencyModal;