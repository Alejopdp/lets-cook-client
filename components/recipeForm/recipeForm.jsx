import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Button, IconButton, Grid, makeStyles, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { Flag as FlagIcon, ArrowBack as BackIcon, Add as AddIcon, Delete } from "@material-ui/icons";

import FormInput from "../atoms/input/input";
import Autocomplete from "../atoms/autocomplete/autocomplete";
import MultiChipInput from "../atoms/multipleChipInput/multipleChipInput";
import FormPaperWithImageDropzone from "../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import PaperWithTitleContainer from "../molecules/paperWithTitleContainer/paperWithTitleContainer";
import { useEffect, useState } from "react";
import ButtonDropdownMenu from "../molecules/buttonDropdownMenu/ButtonDropdownMenu";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    space: {
        height: theme.spacing(2),
    },
}));

const RecipeForm = ({ formData, recipeData }) => {
    const ingredientsList = ["Pollo", "Tomate", "Pan"];
    const ingredientsPrograms = ["Sin glúten", "Sin lactosa", "Apto vegetariano", "Acto vegano"];

    const difficultyLevelOptions = ["Facíl", "Media", "Alta"];
    const toolsOptions = [
        "Cuchillo",
        "Tabla de cortar",
        "Olla",
        "Sartén",
        "Wok",
        "Bol",
        "Recipiente de horno",
        "Bandeja de horno",
        "Exprimidor",
        "Rallador",
        "Minipimer",
    ];
    const languages = [
        {
            code: "es",
            label: "Español",
        },
        {
            code: "en",
            label: "English",
        },
        {
            code: "ca",
            label: "Catalan",
        },
    ];

    const classes = useStyles();
    const router = useRouter();

    const [lang, setLang] = useState(languages[0]);
    const [recipe, setRecipeData] = useState();
    const [ingredientsVariants, setIngredientsVariants] = useState([]);

    const _handleSelectLang = (lang) => setLang(lang);
    const _handleDropFile = ($event) => {};
    const _handleInputChange = ($event) => {};
    const _handleDeleteToolItem = ($event) => {};
    const _handleCheckVariants = ($event) => {};
    const _handleVariantsInputChange = ($event) => {};
    const _handleAddVariant = ($event) => {
        /**TODO:  */
        const newIngredientvariant = [...ingredientsVariants];
        newIngredientvariant.push(newIngredientvariant.length);
        setIngredientsVariants(newIngredientvariant);
        console.log("***-> Add Variant: ", ingredientsVariants);
    };
    const _handleDeleteVariant = ($event) => {};

    useEffect(() => {
        setRecipeData(recipeData);
    }, [recipeData]);

    return (
        <Grid container direction="column" spacing={5} className={classes.height100}>
            {/* RECIPES TITLE */}
            <Grid item container>
                <Grid item container xs alignItems="center">
                    <Grid item>
                        <IconButton color="default" onClick={() => router.back()}>
                            <BackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">Crear receta</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <ButtonDropdownMenu options={languages} label={lang.label} selected={lang.code} handlerOnSelect={_handleSelectLang}>
                        <FlagIcon />
                    </ButtonDropdownMenu>
                </Grid>
            </Grid>

            {/* FORM */}
            <Grid container spacing={2}>
                {/* FORM LEFT */}
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <FormPaperWithImageDropzone
                            title="Datos generales"
                            maxFiles={1}
                            handleDropFile={_handleDropFile}
                            // files={props.data.image}
                            files={[]}
                            filesTitle="Imagen"
                        >
                            <FormInput label="SKU" name="sku" value={recipeData && recipeData.sku} handleChange={_handleInputChange} />
                            <FormInput
                                label="Nombre de la receta"
                                name="name"
                                value={recipeData && recipeData.name}
                                handleChange={_handleInputChange}
                            />
                            <FormInput
                                label="Descripción corta"
                                name="shortDescription"
                                rows={3}
                                multiline={true}
                                value={recipeData && recipeData.shortDescription}
                                handleChange={_handleInputChange}
                            />
                            <FormInput
                                label="Descripción larga"
                                name="largeDescription"
                                rows={5}
                                multiline={true}
                                value={recipeData && recipeData.largeDescription}
                                handleChange={_handleInputChange}
                            />
                            <FormInput
                                label="Tiempo de cocina"
                                name="cookDuration"
                                value={recipeData && recipeData.cookDuration}
                                handleChange={_handleInputChange}
                            />
                            <Autocomplete
                                label="Nivel de dificultad"
                                name="difficultyLevel"
                                options={difficultyLevelOptions.map((dl) => ({ title: dl, value: dl }))}
                                value={recipeData && recipeData.difficultyLevel}
                                onChange={_handleInputChange}
                            />
                            <FormInput
                                label="Peso del plato"
                                name="weight"
                                value={recipeData && recipeData.weight}
                                handleChange={_handleInputChange}
                            />
                            {/* TODO:  Add tools in recipe data */}
                            <MultiChipInput
                                label="Herramientas necesarias"
                                name="tools"
                                options={toolsOptions}
                                value={recipeData && (recipeData.tools || [toolsOptions[0]])}
                                onChange={_handleInputChange}
                                handleRemoveValue={_handleDeleteToolItem}
                            />
                            <div className={classes.space}></div>
                        </FormPaperWithImageDropzone>
                    </Grid>
                    <div className={classes.space}></div>

                    {/* FORM LEFT BOTTOM, INGREDIENTS */}

                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Ingredientes">
                            <Grid item container spacing={3}>
                                {ingredientsVariants.map((ingredientVariant, index) => (
                                    <Grid item xs={12}>
                                        <Grid item container alignItems="center">
                                            <Grid item xs>
                                                <Typography variant="subtitle1">
                                                    Variante {`${index + 1}`} {index === 0 && "- Por defecto"}
                                                </Typography>
                                            </Grid>
                                            {index !== 0 && (
                                                <Grid item>
                                                    <IconButton onClick={_handleDeleteVariant}>
                                                        <Delete />
                                                    </IconButton>
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid key={index} item container spacing={2} xs={12}>
                                            <Grid item xs={3}>
                                                <FormInput
                                                    name={`ingredientsVariantsCode:${index}`}
                                                    value={`RE0031-${index}`}
                                                    handleChange={_handleVariantsInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <MultiChipInput
                                                    options={ingredientsList}
                                                    freeSolo={true}
                                                    // TODO:
                                                    // value={ingredientsList[0]}
                                                    onChange={_handleVariantsInputChange}
                                                    name={`variant:${index}`}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid item container xs={12}>
                                            {ingredientsPrograms.map((program, index) => (
                                                <Grid item xs key={index}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                onChange={_handleCheckVariants}
                                                                name={program}
                                                                color="primary"
                                                                // TODO:
                                                                // checked={_optionsSelected.some(({ id }) => item.id === id)}
                                                            />
                                                        }
                                                        label={program}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            <div className={classes.space}></div>
                            <div className={classes.space}></div>
                            <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={_handleAddVariant}>
                                Agregar variante
                            </Button>
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                </Grid>

                {/* FORM  RIGHT */}
                <Grid item xs={4} spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Tags en imagen">
                            <MultiChipInput
                                options={[
                                    // ...recipeData.imageTags
                                ]}
                                freeSolo={true}
                                // value={props.data.isActive}
                                onChange={_handleInputChange}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Información nutricional">
                            {/* TODO: */}
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Planes relacionados">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                // value={props.data.isActive}
                                onChange={_handleInputChange}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Calendario">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                // value={props.data.isActive}
                                onChange={_handleInputChange}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Meses de disponibilidad">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                // value={props.data.isActive}
                                onChange={_handleInputChange}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Tags">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                // value={props.data.isActive}
                                onChange={_handleInputChange}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                        <div className={classes.space}></div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

RecipeForm.propTypes = {
    recipeData: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sku: PropTypes.string,
        shortDescription: PropTypes.string,
        longDescription: PropTypes.string,
        cookDuration: PropTypes.string,
        difficultyLevel: PropTypes.string,
        imageUrl: PropTypes.string,
        weight: PropTypes.string,
        backOfficeTags: PropTypes.arrayOf(PropTypes.string),
        imageTags: PropTypes.arrayOf(PropTypes.string),
        availableWeeks: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.string,
                label: PropTypes.string,
            })
        ),
        availableMonths: PropTypes.arrayOf(PropTypes.string),
        relatedPlans: PropTypes.arrayOf(PropTypes.number),
    }),
    formData: PropTypes.shape({
        plans: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.number,
                name: PropTypes.string,
            })
        ),
        ingredients: PropTypes.arrayOf(PropTypes.string),
        weeks: PropTypes.arrayOf(
            PropTypes.exact({
                id: PropTypes.number,
                label: PropTypes.string,
            })
        ),
    }),
};

export default RecipeForm;
