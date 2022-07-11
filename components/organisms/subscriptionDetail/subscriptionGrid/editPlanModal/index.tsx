// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import DataDisplay from "../../../../molecules/dataDisplay/dataDisplay";
import { Plan, PlanVariant } from "types/plan/plan";
import { Subscription } from "components/organisms/customerProfile/interface";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

interface EditPlanModalProps {
    open: boolean
    isSubmitting: boolean
    subscription: Subscription
    swapPlanData: {variants: PlanVariant[], plans: Plan[]}
    handleClose: () => void
    handlePrimaryButtonClick: (planId: string, planVariantId: string) => void
}

const EditPlanModal = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [planSelected, setPlanSelected] = useState({ planId: "", planVariantId: "" });

    useEffect(() => {
        setPlanSelected({
            planId: "",
            planVariantId: "",
        });
    }, [props.open]);

    useEffect(() => {
        let newPlanVariantId;
        if (planSelected.planId == "") {
            newPlanVariantId = "";
        } else {
            newPlanVariantId = props.swapPlanData.variants.filter((variant) => variant.planId === planSelected.planId)[0].planVariantId;
        }
        setPlanSelected({
            ...planSelected,
            planVariantId: newPlanVariantId,
        });
    }, [planSelected.planId]);

    const handleChangePlan = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setPlanSelected({
            ...planSelected,
            [name]: value,
        });
    };

    const handleSubmitEditPlan = () => {
        props.handlePrimaryButtonClick(planSelected.planId, planSelected.planVariantId);
    };

    const handleDisabled = () => {
        return !planSelected.planVariantId || props.isSubmitting
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={handleSubmitEditPlan}
            title="Modificar plan contratado"
            primaryButtonText="Modificar plan"
            secondaryButtonText="cerrar"
            fullScreen
            disabled={handleDisabled()}
        >
            <DataDisplay title="Plan actual" text={props.subscription.plan.planName} style={{ marginBottom: theme.spacing(3) }} />
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(2) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Nuevo plan</InputLabel>
                <Select
                    native
                    value={planSelected.planId}
                    onChange={handleChangePlan}
                    label="Nuevo plan"
                    inputProps={{ name: "planId", id: "outlined-age-native-simple" }}
                >
                    <option key="0" value=""></option>
                    {props.swapPlanData.plans.map((plan) => (
                        <option key={plan.planId} value={plan.planId}>
                            {plan.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            {planSelected.planId !== "" && (
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Nueva variante</InputLabel>
                    <Select
                        native
                        value={planSelected.planVariantId}
                        onChange={handleChangePlan}
                        label="Nueva variante"
                        inputProps={{ name: "planVariantId", id: "outlined-age-native-simple" }}
                    >
                        <option key="0" value=""></option>
                        {props.swapPlanData.variants
                            .filter((variant) => variant.planId === planSelected.planId)
                            .map((variant) => (
                                <option key={variant.planVariantId} value={variant.planVariantId}>
                                    {variant.variantDescription}
                                </option>
                            ))}
                    </Select>
                </FormControl>
            )}
        </Modal>
    );
};

export default EditPlanModal;
