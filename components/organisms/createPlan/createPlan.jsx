// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import FormPaperWithDropzone from "../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import FormInput from "../../atoms/input/input";

const CreatePlan = (props) => {
    return (
        <Container maxWidth="md" style={{ margin: "auto" }}>
            <Grid container spacing={2}>
                <Grid container item xs={8}>
                    <Grid item xs={12}>
                        <FormPaperWithDropzone title="Datos generales">
                            <FormInput label="Nombre del plan" />
                            <FormInput label="Descripción" />
                            <FormInput label="SKU" />
                        </FormPaperWithDropzone>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Atributos"></PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Variantes"></PaperWithTitleContainer>
                    </Grid>
                </Grid>
                <Grid container item xs={4} spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Estado"></PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Tipo de plan"></PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Frecuencia"></PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Recetas"></PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

CreatePlan.propTypes = {};

export default CreatePlan;
