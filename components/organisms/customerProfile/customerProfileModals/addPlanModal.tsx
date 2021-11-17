// Utils & Config
import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import { translateFrequency } from "helpers/i18n/i18n";
import { PlanType, PlanVariant } from "types/plan/plan";

const useStyles = makeStyles((theme) => ({
    selectField: {
        width: "100%",
        marginBottom: theme.spacing(2),
    },
}));

const AddPlanModal = (props) => {
    const { selectField } = useStyles();

    // const planAndPlanVariantMap: { [planId: string]: PlanVariant[] } = useMemo(() => {
    //     const map: { [planId: string]: PlanVariant[] } = {};

    //     for (let plan of props.plans) {
    //         map[plan.id] = plan.planVariants;
    //     }

    //     return map;
    // }, [props.plans]);

    return (
        <Box minWidth="400px">
            <FormControl className={selectField} variant="outlined">
                <InputLabel>Plan</InputLabel>
                <Select value={props.selectedPlan} onChange={props.handlePlanSelect} label="Plan">
                    {props.plans.map((plan, index) => (
                        <MenuItem value={plan} key={index}>
                            {plan.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl className={selectField} variant="outlined">
                <InputLabel>Variante</InputLabel>
                <Select value={props.selectedVariation} onChange={props.handleVariationSelect} label="Variante">
                    {props.selectedPlan.variants.map((variant, index) => (
                        <MenuItem value={variant} key={index}>
                            {variant.descriptionWithPrice}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {!!props.selectedPlan && !!props.selectedPlan.id && props.selectedPlan.type !== PlanType.Principal && (
                <FormControl className={selectField} variant="outlined">
                    <InputLabel>Frecuencia</InputLabel>
                    <Select value={props.selectedFrequency} onChange={props.handleChangeFrequency} label="Frecuencia">
                        {props.selectedPlan.availablePlanFrecuencies.map((frequency, index) => (
                            <MenuItem value={frequency} key={index}>
                                {translateFrequency(frequency)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {props.selectedPlan.description && <Typography variant="body1">{props.selectedPlan.description}</Typography>}
        </Box>
    );
};

export default AddPlanModal;

AddPlanModal.propTypes = {};
