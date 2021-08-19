import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Internal components
import TextField from "@material-ui/core/TextField";
import { Box, IconButton } from "@material-ui/core";

// Icons & images
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";

const styles = makeStyles((theme) => ({
    iconBtn: {
        padding: "0px",
        margin: "0px",
    },

    newAttrBtn: {
        width: "150px",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
    },

    newAttrBtnContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        [theme.breakpoints.down("xs")]: {
            justifyContent: "center",
        },
    },
}));

interface DynamicAttributesForm {
    attributes: { key: string; value: string }[];
    handleChange: (index: number, keyName: string, value: string) => void;
    handleDeleteAttr: (index: number) => void;
}

const DynamicAttributesForm = (props: DynamicAttributesForm) => {
    const classes = styles();

    return (
        <Box width={"100%"}>
            {props.attributes.length <= 0 && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <InfoRoundedIcon style={{ color: "#e29c00" }} />
                    <p style={{ fontWeight: 700, color: "gray", marginLeft: "5px" }}>Aún no se han agregado atributos</p>
                </div>
            )}
            {props.attributes.map((attr, index) => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 8,
                    }}
                >
                    <TextField
                        style={{ width: "60%", marginRight: 8 }}
                        variant="outlined"
                        onChange={(e) => props.handleChange(index, "key", e.target.value)}
                        placeholder="Nombre"
                        value={attr.key}
                    />
                    <TextField
                        style={{ width: "30%" }}
                        variant="outlined"
                        onChange={(e) => props.handleChange(index, "value", e.target.value)}
                        placeholder="Valor"
                        value={attr.value}
                    />
                    <IconButton onClick={() => props.handleDeleteAttr(index)} className={classes.iconBtn} style={{ width: "10%" }}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
        </Box>
    );
};

export default DynamicAttributesForm;
