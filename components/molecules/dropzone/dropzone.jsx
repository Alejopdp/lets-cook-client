// Utils & config
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Dropzone from "../../atoms/dropzone/dropzone";
import { useTheme } from "@material-ui/core";

// External components
import Typography from "@material-ui/core/Typography";


// Internal components
import Paper from "../paperWithTitleContainer/paperWithTitleContainer";
import FileList from "./fileList";

const DropzoneCustom = (props) => {
    const theme = useTheme();

    return (
        <>
            <Typography variant="body1" style={{ fontWeight: 600, marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                {props.title || "Archivos:"}
            </Typography>
            <Dropzone handleDropFile={props.handleDropFile} maxFiles={props.maxFiles} />
            {props.files && (
                <FileList files={props.files} fileName={props.fileName} />
            )}
        </>
    );
};

DropzoneCustom.propTypes = {
    title: PropTypes.string.isRequired,
    handleDropFile: PropTypes.func.isRequired,
    maxFiles: PropTypes.number.isRequired,
    files: PropTypes.array.isRequired,
    filesTitle: PropTypes.string,
};

export default DropzoneCustom;
