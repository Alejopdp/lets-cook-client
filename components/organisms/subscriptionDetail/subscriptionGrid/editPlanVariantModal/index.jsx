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


const EditPlanModal = (props) => {

    const changePlanData = {
        variants: [
            { planId: '1', planVariantId: '20', planVariantDescription: '4 recetas para 3 personas - 36 €/semana' },
            { planId: '1', planVariantId: '21', planVariantDescription: '3 recetas para 3 personas - 30 €/semana' },
            { planId: '1', planVariantId: '22', planVariantDescription: '2 recetas para 3 personas - 24 €/semana' },
        ]
    }

    const theme = useTheme();
    const classes = useStyles();
    const [newPlanVariantId, setNewPlanVariantId] = useState('');


    useEffect(() => {
        setNewPlanVariantId('')
    }, [props.open]);

    const handleChangePlan = event => {
        let value = event.target.value;
        setNewPlanVariantId(value)
    }

    const handleSubmitEditPlan = () => {
        props.handlePrimaryButtonClick(props.planId, newPlanVariantId)
    }

    const handleDisabled = () => {
        if (newPlanVariantId == '') {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitEditPlan}
            title='Modificar variante'
            primaryButtonText='Modificar variante'
            // primaryButtonColor='#FC1919'
            secondaryButtonText='cerrar'
            fullScreen
            disabled={handleDisabled()}
        >
            <DataDisplay title='Variante actual' text='3 recetas para 3 personas' style={{ marginBottom: theme.spacing(3) }} />
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Nueva variante</InputLabel>
                <Select
                    native
                    value={newPlanVariantId}
                    onChange={handleChangePlan}
                    label="Nueva variante"
                    inputProps={{ name: 'planVariantId', id: 'outlined-age-native-simple' }}
                >
                    <option key='0' value=''></option>
                    {changePlanData.variants.map(variant => (
                        <option key={variant.planVariantId} value={variant.planVariantId}>{variant.planVariantDescription}</option>
                    ))}
                </Select>
            </FormControl>
        </Modal>
    );
}

export default EditPlanModal;