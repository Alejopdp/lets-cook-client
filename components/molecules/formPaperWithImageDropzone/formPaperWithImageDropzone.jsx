// Utils & config
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Dropzone from "../../atoms/dropzone/dropzone";

// External components

// Internal components
import Paper from "../paperWithTitleContainer/paperWithTitleContainer";

const FormPaperWithImageDropzone = (props) => {
    return (
        <Paper title={props.title} fullWidth={true}>
            {props.children}
            <Dropzone />
        </Paper>
    );
};

FormPaperWithImageDropzone.propTypes = {
    title: PropTypes.string.isRequired,
};

export default FormPaperWithImageDropzone;
