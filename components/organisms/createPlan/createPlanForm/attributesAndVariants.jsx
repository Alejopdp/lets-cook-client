// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../../lang").attributesAndVariants;
import { useTheme } from "@material-ui/styles";

// External components
import Grid from "@material-ui/core/Grid";
import { DataGrid } from "@material-ui/data-grid";
import Box from "@material-ui/core/Box";

// Internal components
import CreateButton from "../../../atoms/createButton/createButton";
import FormPaperWithEmptyState from "../../../molecules/formPaperWithEmptyState/formPaperWithEmptyState";
import KeyValueInput from "../../../molecules/keyValueInput/keyValueInput";

const AttributesAndVariants = (props) => {
    const theme = useTheme()
    const router = useRouter();
    const lang = langs[router.locale];
    const isEmpty = props.attributes.length < 1;

    return (
        <>
            <Grid item xs={12}>
                <FormPaperWithEmptyState empty={isEmpty} emptyText={lang.attributesEmptyText} title={lang.attributesPaperTitle}>
                    {!isEmpty && (
                        <Box marginBottom={2}>
                            {props.attributes.map((attr, index) => (
                                <KeyValueInput
                                    index={index}
                                    title={`${lang.option} ${index + 1}`}
                                    handleRemoveAttribute={() => props.handleRemoveAttribute(index)}
                                    keyValue={attr[0]}
                                    values={attr[1]}
                                    handleKeyChange={props.handleKeyChange}
                                    handleValuesChange={props.handleValuesChange}
                                    handleRemoveAttributeValue={props.handleRemoveAttributeValue}
                                />
                            ))}
                        </Box>
                    )}
                    <CreateButton disabled={false} onClick={props.handleAddAttribute}>
                        {lang.addAttributeButton}
                    </CreateButton>
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
                            onEditCellChangeCommitted={(params, e) => props.handleVariantsEdit(params, e)}
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
