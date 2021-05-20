// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const FileList = (props) => {
    const theme = useTheme();

    return props.files.length > 0 ? (
        <Box>
            <Typography variant="h6" style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                {props.title || "Archivos:"}
            </Typography>
            <ul>
                {props.files.map((file) => (
                    <li>{file.name || props.fileName}</li>
                ))}
            </ul>
        </Box>
    ) : (
        <></>
    );
};

FileList.propTypes = {
    title: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
};

export default FileList;
