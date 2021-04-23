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
                    <Autocomplete options={[]} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Tipo de plan">
                    <Autocomplete options={[]} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Frecuencia">
                    <MultipleChipInput options={[]} />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Recetas">
                    <Checkbox />
                </PaperWithTitleContainer>
            </Grid>
            <Grid item xs={12}>
                <PaperWithTitleContainer fullWidth={true} title="Planes adicionales"></PaperWithTitleContainer>
            </Grid>
        </Grid>
    );
};

Others.propTypes = {};

export default Others;
