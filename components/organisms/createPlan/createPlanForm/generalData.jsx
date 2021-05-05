// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../../lang").planGeneralData;

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import FormPaperWithDropzone from "../../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import FormInput from "../../../atoms/input/input";

const GeneralData = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Grid item xs={12}>
            <FormPaperWithDropzone
                title={lang.paperTitle}
                handleDropFile={props.handleDropFile}
                maxFiles={1}
                files={props.data.image}
                filesTitle={lang.filesTitle}
            >
                <FormInput label={lang.planName} name="name" value={props.data.name} handleChange={props.handleChange} />
                <FormInput
                    label={lang.planDescription}
                    name="description"
                    value={props.data.description}
                    handleChange={props.handleChange}
                />
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
    handleDropFile: PropTypes.func.isRequired,
    maxFiles: PropTypes.number.isRequired,
};

export default GeneralData;
