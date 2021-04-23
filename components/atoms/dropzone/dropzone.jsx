// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";

// External components
import Dropzone from "react-dropzone";
import Typography from "@material-ui/core/Typography";

// Internal components

// Icons & images
import Backup from "@material-ui/icons/Backup";

const CustomDropzone = (props) => {
    const theme = useTheme();

    return (
        <Dropzone>
            {({ getRootProps, getInputProps }) => (
                <section
                    style={{
                        height: 112,
                        border: `dashed 2px #BABABA`,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#F2F2F2",
                    }}
                >
                    <div
                        {...getRootProps()}
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <input {...getInputProps()} />
                        <Backup color="primary" fontSize="32px" />
                        <Typography variant="body1" color="textSecondary" style={{ fontSize: 14, fontWeight: "Medium" }}>
                            Arrastra una imagen aquí o clickea
                        </Typography>
                    </div>
                </section>
            )}
        </Dropzone>
    );
};

CustomDropzone.propTypes = {};

export default CustomDropzone;
