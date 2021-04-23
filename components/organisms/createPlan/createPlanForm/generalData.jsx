// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import FormPaperWithDropzone from "../../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import FormInput from "../../../atoms/input/input";

const GeneralData = (props) => {
    return (
        <Grid item xs={12}>
            <FormPaperWithDropzone title="Datos generales">
                <FormInput label="Nombre del plan" name="name" value={props.data.name} handleChange={props.handleChange} />
                <FormInput label="Descripción" name="description" value={props.data.description} handleChange={props.handleChange} />
                <FormInput label="SKU" name="sku" value={props.data.sku} handleChange={props.handleChange} />
            </FormPaperWithDropzone>
        </Grid>
    );
};

GeneralData.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired,
    }),
    handleChange: PropTypes.func.isRequired,
};

export default GeneralData;
