// Utils & config
import React from "react";
import PropTypes from "prop-types";

// Internal components
import FormInput from "../../atoms/input/input";
import MultiChipInput from "../../atoms/multipleChipInput/multipleChipInput";

// External components
import { FormControlLabel, Grid, IconButton, Radio, RadioGroup, Typography, useTheme } from "@material-ui/core";
import { Flag as FlagIcon, ArrowBack, Add as AddIcon, Delete } from "@material-ui/icons";

interface RecipeVariantEditorProps {
    index: number;
    variant: any;
    restrictions: any;
    ingredients: any;
    ingredientsVariants: any;
    handleDeleteVariantClick: (variant: any, index: number) => void;
    handleVariantSkuChange: (index: number, value: string) => void;
    handleAddIngredientsToVariant: (index: number, ingredient: any) => void;
    handleRemoveIngredientFromVariant: (index: number, ingredientToRemove: any) => void;
    handleRestrictionsForVariants: (index: number, value: string) => void;
}

const RecipeVariantEditor = (props: RecipeVariantEditorProps) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} key={props.index}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="body1" style={{ fontWeight: 600, marginBottom: theme.spacing(1) }}>
                        Variante {`${props.index + 1}`} {props.index === 0 && "- Por defecto"}
                    </Typography>
                </Grid>
                {props.index !== 0 && (
                    <Grid item>
                        <IconButton onClick={() => props.handleDeleteVariantClick({ ...props.variant, index: props.index }, props.index)}>
                            <Delete />
                        </IconButton>
                    </Grid>
                )}
            </Grid>
            <Grid item container spacing={2} xs={12}>
                <Grid item xs={3}>
                    <FormInput
                        name={`ingredientsVariantsCode:${props.index}`}
                        value={props.variant.sku}
                        handleChange={(e) => props.handleVariantSkuChange(props.index, e.target.value)}
                        label="SKU"
                    />
                </Grid>
                <Grid item xs>
                    <MultiChipInput
                        complexOptions={true}
                        options={props.ingredients}
                        values={props.variant.ingredients}
                        onChange={(e, newIngredient) => props.handleAddIngredientsToVariant(props.index, newIngredient)}
                        name={`variant:${props.index.toString()}`}
                        handleRemoveValue={(ingredientToRemove) => props.handleRemoveIngredientFromVariant(props.index, ingredientToRemove)}
                    />
                </Grid>
            </Grid>
            <Grid item container xs={12}>
                <RadioGroup
                    aria-label="gender"
                    name="Restrictions"
                    value={props.variant.restriction}
                    onChange={(e) => props.handleRestrictionsForVariants(props.index, e.target.value)}
                    style={{ flexDirection: "row" }}
                >
                    {props.restrictions.map((variantRestriction, restrictionIndex) => (
                        <FormControlLabel
                            key={restrictionIndex}
                            value={variantRestriction.id}
                            disabled={
                                (props.ingredientsVariants.some((variant) => variant.restriction === variantRestriction.id) &&
                                    props.variant.restriction !== variantRestriction.id) ||
                                (props.index === 0 && variantRestriction.value !== "apto_todo")
                            }
                            control={<Radio checked={variantRestriction.id === props.variant.restriction} />}
                            checked={variantRestriction.id === props.variant.restriction}
                            label={variantRestriction.label}
                        />
                    ))}
                </RadioGroup>
            </Grid>
        </Grid>
    );
};

RecipeVariantEditor.propTypes = {};

export default RecipeVariantEditor;
