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
        plans: [
            { planId: '2', planName: 'Plan Gourmet' },
            { planId: '3', planName: 'Plan Ahorro' },
            { planId: '4', planName: 'Plan Vegetariano' },
            { planId: '5', planName: 'Plan Vegano' },
        ],
        variants: [
            { planId: '2', planVariantId: '6', planVariantDescription: '4 recetas para 3 personas - 36 €/semana' },
            { planId: '2', planVariantId: '7', planVariantDescription: '3 recetas para 3 personas - 30 €/semana' },
            { planId: '2', planVariantId: '8', planVariantDescription: '2 recetas para 3 personas - 24 €/semana' },
            { planId: '3', planVariantId: '9', planVariantDescription: '4 recetas para 2 personas - 30 €/semana' },
            { planId: '3', planVariantId: '10', planVariantDescription: '3 recetas para 2 personas - 24 €/semana' },
            { planId: '3', planVariantId: '11', planVariantDescription: '2 recetas para 2 personas - 18 €/semana' },
            { planId: '4', planVariantId: '12', planVariantDescription: '3 recetas para 2 personas - 24 €/semana' },
            { planId: '4', planVariantId: '13', planVariantDescription: '2 recetas para 2 personas - 18 €/semana' },
            { planId: '5', planVariantId: '14', planVariantDescription: '3 recetas para 2 personas - 18 €/semana' },
            { planId: '5', planVariantId: '15', planVariantDescription: '2 recetas para 2 personas - 15 €/semana' },
        ]
    }


    const theme = useTheme();
    const classes = useStyles();
    const [planSelected, setPlanSelected] = useState({ planId: '', planVariantId: '' });


    useEffect(() => {
        setPlanSelected({
            planId: '',
            planVariantId: ''
        })
    }, [props.open]);

    useEffect(() => {
        let newPlanVariantId;
        if (planSelected.planId == '') {
            newPlanVariantId = ''
        } else {
            newPlanVariantId = changePlanData.variants.filter(variant => variant.planId === planSelected.planId)[0].planVariantId
        }
        setPlanSelected({
            ...planSelected,
            planVariantId: newPlanVariantId
        })
    }, [planSelected.planId]);

    const handleChangePlan = event => {
        let value = event.target.value;
        let name = event.target.name;
        setPlanSelected({
            ...planSelected,
            [name]: value
        });
    }

    const handleSubmitEditPlan = () => {
        props.handlePrimaryButtonClick(planSelected.planId, planSelected.planVariantId)
    }

    const handleDisabled = () => {
        if (planSelected.planVariantId == '') {
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
            title='Modificar plan contratado'
            primaryButtonText='Modificar plan'
            // primaryButtonColor='#FC1919'
            secondaryButtonText='cerrar'
            fullScreen
            disabled={handleDisabled()}
        >
            <DataDisplay title='Plan actual' text='Plan Familiar' style={{ marginBottom: theme.spacing(3) }} />
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(2) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Nuevo plan</InputLabel>
                <Select
                    native
                    value={planSelected.planId}
                    onChange={handleChangePlan}
                    label="Nuevo plan"
                    inputProps={{ name: 'planId', id: 'outlined-age-native-simple' }}
                >
                    <option key='0' value=''></option>
                    {changePlanData.plans.map(plan => (
                        <option key={plan.planId} value={plan.planId}>{plan.planName}</option>
                    ))}
                </Select>
            </FormControl>
            {planSelected.planId !== '' && (
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Nueva variante</InputLabel>
                    <Select
                        native
                        value={planSelected.planVariantId}
                        onChange={handleChangePlan}
                        label="Nueva variante"
                        inputProps={{ name: 'planVariantId', id: 'outlined-age-native-simple' }}
                    >
                        <option key='0' value=''></option>
                        {changePlanData.variants.filter(variant => variant.planId === planSelected.planId).map(variant => (
                            <option key={variant.planVariantId} value={variant.planVariantId}>{variant.planVariantDescription}</option>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Modal>
    );
}

export default EditPlanModal;