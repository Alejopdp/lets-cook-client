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


const CancelSubscriptionModal = (props) => {


    const cancellationReasons = [
        { id: 1, value: 'created_by_error', text: 'Se ha creado por error' },
        { id: 2, value: 'cant_get_kits_next_week', text: 'No puedo recibir los kits la próxima semana' },
        { id: 3, value: 'special_diet', text: 'Tengo una dieta especial' },
        { id: 4, value: 'move_abroad', text: 'Me voy a vivir fuera por tiempo indeterminado' },
        { id: 5, value: 'dont_like_meal_kits', text: 'No me gustan los kits para cocinar (meal kits)' },
        { id: 6, value: 'had_problems_with_letscook', text: 'He tenido problemas con Let’s Cook' },
        { id: 7, value: 'price_too_high', text: 'El precio es muy alto' },
        { id: 8, value: 'other_reason', text: 'Otra razón' }
    ];


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
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3)}}>
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
                    {/* <option key='0' value=''></option> */}
                    {cancellationReasons.map(reason => (
                        <option key={reason.id} value={reason.value}>{reason.text}</option>
                    ))}
                </Select>
                <TextField
                    id="created_by_error_comments"
                    label="Comentarios adicionales "
                    multiline
                    rows={5}
                    variant="outlined"
                    value={cancellationComments}
                    onChange={handleChangeCancellationComments}
                    style={{ marginTop: theme.spacing(2) }}
                />
            </FormControl>
        </Modal>
    );
}

export default CancelSubscriptionModal;