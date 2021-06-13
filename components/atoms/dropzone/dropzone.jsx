// Utils & config
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
const langs = require("../../../lang").dropZone;

// External components
import Dropzone, { useDropzone } from "react-dropzone";
import Typography from "@material-ui/core/Typography";

// Internal components

// Icons & images
import Backup from "@material-ui/icons/Backup";

const baseStyle = {
    flex: 1,
    height: 112,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const activeStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};

const CustomDropzone = (props) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: ["image/*", ".kml"],
        maxFiles: props.maxFiles,
        onDropAccepted: props.handleDropFile,
    });
    const router = useRouter();
    const lang = langs[router.locale];

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept]
    );

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <Backup color="primary" fontSize="32px" />
                <Typography variant="body1" color="textSecondary" style={{ fontSize: 14, fontWeight: "Medium" }}>
                    {lang.label}
                </Typography>
            </div>
        </div>
    );
};

CustomDropzone.propTypes = {
    handleDropFile: PropTypes.func.isRequired,
    maxFiles: PropTypes.number.isRequired,
};

export default CustomDropzone;
