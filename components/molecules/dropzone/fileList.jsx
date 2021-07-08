// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Box from "@material-ui/core/Box";

const FileList = (props) => {
    const theme = useTheme();

    return (
        <Box>
            <ul>
                {props.files.map((file) => (
                    <li>{file.name || props.fileName}</li>
                ))}
            </ul>
        </Box>
    )
};

FileList.propTypes = {
    title: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
};

export default FileList;
