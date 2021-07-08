// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../../lang").otherPlanData;

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import FormPaperWithEmptyState from "../../../molecules/formPaperWithEmptyState/formPaperWithEmptyState";
import Autocomplete from "../../../atoms/autocomplete/autocomplete";
import Checkbox from "../../../atoms/checkbox/checkbox";
import MultipleChipInput from "../../../atoms/multipleChipInput/multipleChipInput";

const Others = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.stateTitle}>
                    <Autocomplete
                        options={stateOptions}
                        value={props.data.isActive}
                        onChange={props.handleChange}
                        name="isActive"
                        disableClearable
                    />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title={lang.typeTitle}>
                    <Autocomplete
                        options={typeOptions}
                        value={props.data.planType}
                        onChange={props.handleChange}
                        name="planType"
                        disableClearable
                    />
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
                    <Checkbox
                        label={lang.hasRecipesText}
                        value={props.data.hasRecipes}
                        checked={props.data.hasRecipes}
                        handleChange={props.handleHasRecipes}
                    />
                    <Checkbox
                        label='El usuario podrá elegir recetas'
                        value={props.data.abilityToChooseRecipes}
                        checked={props.data.abilityToChooseRecipes}
                        handleChange={props.handleAbilityToChooseRecipes}
                    />
                </PaperWithTitleContainer>
            </Grid>
            {props.data.planType === "Principal" && (
                <Grid item xs={12}>
                    <FormPaperWithEmptyState
                        fullWidth={true}
                        title={lang.additionalPlansTitle}
                        empty={props.additionalPlans.length === 0}
                        emptyText={lang.additionaPlansEmpty}
                    >
                        <Box display="flex" flexDirection="column" alignItems="flex-start">
                            {props.additionalPlans.map((plan) => (
                                <Checkbox
                                    label={plan.name}
                                    handleChange={props.handleAdditionalPlansChange}
                                    checked={props.selectedAdditionalPlansIds.some((id) => id === plan.id)}
                                    value={plan.id}
                                />
                            ))}
                        </Box>
                    </FormPaperWithEmptyState>
                </Grid>
            )}
        </>
    );
};

Others.propTypes = {
    data: PropTypes.shape({
        isActive: PropTypes.bool.isRequired,
        planType: PropTypes.string.isRequired,
        frequency: PropTypes.arrayOf(PropTypes.string).isRequired,
        hasRecipes: PropTypes.bool.isRequired,
    }),

    additionalPlans: PropTypes.array.isRequired,
    selectedAdditionalPlansIds: PropTypes.array.isRequired,
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

const frequencyOptions = ["PorUnicaVez", "Semanal", "Quincenal", "Mensual"];
