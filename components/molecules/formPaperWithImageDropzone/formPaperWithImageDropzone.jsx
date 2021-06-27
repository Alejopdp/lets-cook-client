// Utils & config
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Dropzone from "../../atoms/dropzone/dropzone";

// External components

// Internal components
import Paper from "../paperWithTitleContainer/paperWithTitleContainer";
import FileList from "./fileList";

const FormPaperWithImageDropzone = (props) => {
    return (
        <Paper title={props.title} fullWidth={true}>
            {props.children}
            <Dropzone handleDropFile={props.handleDropFile} maxFiles={props.maxFiles} />
            <FileList files={props.files} title={props.filesTitle} fileName={props.fileName} />
        </Paper>
    );
};

FormPaperWithImageDropzone.propTypes = {
    title: PropTypes.string.isRequired,
    handleDropFile: PropTypes.func.isRequired,
    maxFiles: PropTypes.number.isRequired,
    files: PropTypes.array.isRequired,
    filesTitle: PropTypes.string,
};

export default FormPaperWithImageDropzone;
