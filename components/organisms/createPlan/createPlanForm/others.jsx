// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Autocomplete from "../../../atoms/autocomplete/autocomplete";
import Checkbox from "../../../atoms/checkbox/checkbox";
import MultipleChipInput from "../../../atoms/multipleChipInput/multipleChipInput";

const Others = (props) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Estado">
                    <Autocomplete options={stateOptions} value={props.data.isActive} onChange={props.handleChange} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Tipo de plan">
                    <Autocomplete options={typeOptions} value={props.data.planType} onChange={props.handleChange} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Frecuencia">
                    <MultipleChipInput options={frequencyOptions} values={props.data.frequency} onChange={props.handleChange} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Recetas">
                    <Checkbox label="El plan tendrá recetas asociadas" value={props.hasRecipes} onChange={props.handleChange} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Planes adicionales">
                    {additionalPlans.map((plan) => (
                        <Checkbox label={plan} />
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
    { title: "Activo", value: true },
    { title: "No activo", value: false },
];
const typeOptions = [
    { title: "Principal", value: "Principal" },
    { title: "Adicional", value: "Adicional" },
];
const frequencyOptions = ["Por única vez", "Semanal", "Quincenal", "Mensual"];
const additionalPlans = ["Plan breakfast", "Plan lunch", "Plan lunch vegano"];
