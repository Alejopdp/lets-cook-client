// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core";
const langs = require("../../../../lang").planGeneralData;

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import FormInput from "../../../atoms/input/input";
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Dropzone from "../../../molecules/dropzone/dropzone";

const GeneralData = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const lang = langs[router.locale];

    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title={lang.paperTitle} fullWidth={true}>
                <FormInput label={lang.planName} name="name" value={props.data.name} handleChange={props.handleChange} />
                <FormInput label="SKU" name="sku" value={props.data.sku} handleChange={props.handleChange} />
                <FormInput
                    label={lang.planDescription}
                    name="description"
                    value={props.data.description}
                    handleChange={props.handleChange}
                />
                <FormInput label="Slug" name="slug" value={props.data.slug} handleChange={props.handleChange} />
                <Dropzone
                    title="Imagen de fondo"
                    handleDropFile={props.handleDropFileImage}
                    maxFiles={1}
                    files={props.data.image}
                    fileName={props.data.name}
                />
                <Grid container spacing={2} style={{ marginTop: theme.spacing(2) }}>
                    <Grid item xs={6}>
                        <Dropzone
                            title="Ícono en color"
                            handleDropFile={props.handleDropFileIconColor}
                            maxFiles={1}
                            files={props.data.iconColor}
                            fileName={props.data.name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Dropzone
                            title="Ícono en blanco y negro"
                            handleDropFile={props.handleDropFileIconByg}
                            maxFiles={1}
                            files={props.data.iconByg}
                            fileName={props.data.name}
                        />
                    </Grid>
                </Grid>
            </PaperWithTitleContainer>
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
