// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../../lang").otherPlanData;

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Autocomplete from "../../../atoms/autocomplete/autocomplete";
import Checkbox from "../../../atoms/checkbox/checkbox";
import MultipleChipInput from "../../../atoms/multipleChipInput/multipleChipInput";

const Others = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.stateTitle}>
                    <Autocomplete options={stateOptions} value={props.data.isActive} onChange={props.handleChange} name="isActive" />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.typeTitle}>
                    <Autocomplete options={typeOptions} value={props.data.planType} onChange={props.handleChange} name="planType" />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.frequencyTitle}>
                    <MultipleChipInput
                        options={frequencyOptions}
                        values={props.frequency}
                        handleRemoveValue={props.handleRemoveFrequency}
                        onChange={props.handleFrequencyChange}
                        name="frequency"
                    />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.recipesTitle}>
                    <Checkbox label={lang.hasRecipesText} value={props.data.hasRecipes} onChange={props.handleHasRecipes} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.additionalPlansTitle}>
                    {additionalPlans.map((plan) => (
                        <Checkbox label={plan} onChange={props.handleAdditionalPlansChange} value={plan} />
                    ))}
                </PaperWithTitleContainer>
            </Grid>
        </Grid>
    );
};

Others.propTypes = {
    data: PropTypes.shape({
        isActive: PropTypes.bool.isRequired,
        planType: PropTypes.string.isRequired,
        frequency: PropTypes.arrayOf(PropTypes.string).isRequired,
        hasRecipes: PropTypes.bool.isRequired,
    }),
};

export default Others;

const stateOptions = [
    { title: "Activo", value: "Activo" },
    { title: "No activo", value: "No activo" },
];

const typeOptions = [
    { title: "Principal", value: "Principal" },
    { title: "Adicional", value: "Adicional" },
];

const frequencyOptions = ["Por única vez", "Semanal", "Quincenal", "Mensual"];
const additionalPlans = ["Plan breakfast", "Plan lunch", "Plan lunch vegano"];
