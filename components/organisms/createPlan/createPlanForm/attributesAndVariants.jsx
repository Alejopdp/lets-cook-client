// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../../lang").attributesAndVariants;
import { useTheme } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";

// External components
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { DataGrid } from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";
import { Add as AddIcon, CallMerge } from "@material-ui/icons";

// Internal components
import FormPaperWithEmptyState from "../../../molecules/formPaperWithEmptyState/formPaperWithEmptyState";
import KeyValueInput from "../../../molecules/keyValueInput/keyValueInput";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            "& .data-grid-row--deleted": {
                backgroundColor: "#C6C6C6",
                "&:hover": {
                    backgroundColor: "#C6C6C6",
                },

                "&:selected": {
                    backgroundColor: "#C6C6C6",
                },
                "&:selected:hover": {
                    backgroundColor: "#C6C6C6",
                },
            },
        },
        row: {
            "& .data-grid-row--deleted": {
                backgroundColor: "#C6C6C6",
                "&:hover": {
                    backgroundColor: "#C6C6C6",
                },

                "&:selected": {
                    backgroundColor: "#C6C6C6",
                },
                "&:selected:hover": {
                    backgroundColor: "#C6C6C6",
                },
            },
        },
    };
});

const AttributesAndVariants = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const lang = langs[router.locale];
    const isEmpty = props.attributes.length < 1;
    const classes = useStyles();

    const attributeKeyIsPersonasOrRecetas = (attr) => {
        return attr[0] === "Personas" || attr[0] === "Recetas";
    };

    const planHasRecipesAndAttributeIsRecipes = (attr) => {
        return attr[0] === "Recetas" && props.hasRecipes;
    };

    return (
        <>
            <Grid item xs={12}>
                <FormPaperWithEmptyState empty={isEmpty} emptyText={lang.attributesEmptyText} title={lang.attributesPaperTitle}>
                    {!isEmpty && (
                        <Box>
                            {props.attributes.map((attr, index) => (
                                <KeyValueInput
                                    index={index}
                                    title={`${lang.option} ${index + 1}`}
                                    handleRemoveAttribute={() => props.handleRemoveAttribute(index)}
                                    keyValue={attr[0]}
                                    values={attr[1]}
                                    isDeletable={
                                        !(props.planType === "Principal" && attributeKeyIsPersonasOrRecetas(attr)) &&
                                        !planHasRecipesAndAttributeIsRecipes(attr)
                                    }
                                    isKeyEditable={
                                        !(props.planType === "Principal" && attributeKeyIsPersonasOrRecetas(attr)) &&
                                        !planHasRecipesAndAttributeIsRecipes(attr)
                                    }
                                    handleKeyChange={props.handleKeyChange}
                                    handleValuesChange={props.handleValuesChange}
                                    handleRemoveAttributeValue={props.handleRemoveAttributeValue}
                                />
                            ))}
                        </Box>
                    )}
                    {props.planType !== "Principal" && (
                        <Button
                            style={{ marginTop: theme.spacing(2) }}
                            variant="contained"
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={props.handleAddAttribute}
                        >
                            {lang.addAttributeButton}
                        </Button>
                    )}
                </FormPaperWithEmptyState>
            </Grid>
            <Grid item xs={12}>
                <FormPaperWithEmptyState
                    empty={props.variantsRows.length === 0}
                    emptyText={lang.variantsEmptyText}
                    fullWidth={true}
                    title={lang.variantsPaperTitle}
                >
                    {props.variantsRows.length > 0 && (
                        <DataGrid
                            classes={{ root: classes.root, row: classes.row }}
                            onEditCellChangeCommitted={(params, e) => {
                                e.preventDefault();
                                props.handleVariantsEdit(params, e);
                            }}
                            getRowClassName={(params) => (params.row.isDeleted ? "data-grid-row--deleted" : "")}
                            autoHeight
                            disableColumnMenu
                            disableColumnSelector
                            disableColumnFilter
                            disableColumnReorder
                            disableColumnResize
                            hideFooter
                            rows={props.variantsRows}
                            columns={props.variantsColumns}
                        />
                    )}
                </FormPaperWithEmptyState>
            </Grid>
        </>
    );
};

AttributesAndVariants.propTypes = {
    attributes: PropTypes.array.isRequired,
    variants: PropTypes.array.isRequired,
    handleKeyChange: PropTypes.func.isRequired,
    handleValuesChange: PropTypes.func.isRequired,
    handleAddAttribute: PropTypes.func.isRequired,
    handleRemoveAttributeValue: PropTypes.func.isRequired,
    variantsRows: PropTypes.array.isRequired,
    variantsColumns: PropTypes.array.isRequired,
};

export default AttributesAndVariants;
