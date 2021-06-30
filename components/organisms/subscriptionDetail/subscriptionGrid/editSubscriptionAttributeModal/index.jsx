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

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
}));


const EditSubscriptionAttributeModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [reasonSelected, setReason] = useState({});
    const [cancellationComments, setCancellationComments] = useState('')

    const handleChangeReason = event => {
        let newReason = cancellationReasons.filter(reason => reason.value === event.target.value)[0]
        console.log(newReason)
        setReason(newReason);
    }

    const handleChangeCancellationComments = (event) => {
        setCancellationComments(event.target.value);
    }

    const handleSubmitCancellation = () => {
        props.handlePrimaryButtonClick(reasonSelected, cancellationComments)
        setReason({})
        setCancellationComments('')
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitCancellation}
            title='Cancelar subscripción'
            primaryButtonText='cancelar subscripción'
            primaryButtonColor='#FC1919'
            secondaryButtonText='cerrar'
            fullScreen
        >
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                ¿Estás seguro de que quieres cancelar la subscripción? Ingrese el motivo a continuación
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Razones de cancelación</InputLabel>
                <Select
                    native
                    value={reasonSelected && reasonSelected.value}
                    onChange={handleChangeReason}
                    label="Razones de cancelación"
                    inputProps={{ name: 'reason', id: 'outlined-age-native-simple' }}
                >
                    <option key='0' value=''></option>
                    {['1', '2'].map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </Select>
            </FormControl>
        </Modal>
    );
}

export default EditSubscriptionAttributeModal;