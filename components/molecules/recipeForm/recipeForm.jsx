// Utils / config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { createRecipe } from "../../../helpers/serverRequests/recipe";

// External components
import { Button, IconButton, Grid, makeStyles, useTheme, Typography, FormControlLabel, Box } from "@material-ui/core";
import { Flag as FlagIcon, ArrowBack as BackIcon, Add as AddIcon, Delete } from "@material-ui/icons";

// Internal components
import FormInput from "../../atoms/input/input";
import Autocomplete from "../../atoms/autocomplete/autocomplete";
import MultiChipInput from "../../atoms/multipleChipInput/multipleChipInput";
import FormPaperWithImageDropzone from "../../molecules/formPaperWithImageDropzone/formPaperWithImageDropzone";
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import ButtonDropdownMenu from "../../molecules/buttonDropdownMenu/ButtonDropdownMenu";
import FormPaperWithEmptyState from "../../molecules/formPaperWithEmptyState/formPaperWithEmptyState";
import Checkbox from "../../atoms/checkbox/checkbox";
import BackAndCreateButtons from "../../molecules/backAndCreateButtons/backAndCreateButtons";
import NutritionalInformationGrid from "../../molecules/nutritionalInformationGrid/nutritionalInformationGrid";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    space: {
        height: theme.spacing(2),
    },
}));

const RecipeForm = ({ formData, recipeData }) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [lang, setLang] = useState(languages[0]);
    const [recipe, setRecipeData] = useState();
    const [ingredientsVariants, setIngredientsVariants] = useState([]); // {ingredients: [], sku: ""}
    const [imageTags, setimageTags] = useState([]);
    const [tags, settags] = useState([]);
    const [weeks, setweeks] = useState([]);
    const [months, setmonths] = useState([]);
    const [generalData, setgeneralData] = useState({
        sku: "",
        shortDescription: "",
        longDescription: "",
        cookDuration: "",
        weight: "",
        image: [],
    });
    const [tools, settools] = useState([]);
    const [difficultyLevel, setdifficultyLevel] = useState("");
    const [plans, setplans] = useState([]);
    const [nutritionalInformation, setnutritionalInformation] = useState([]); // [[], []]
    const [isSubmitting, setisSubmitting] = useState(false);
    const _handleSelectLang = (lang) => setLang(lang);
    const _handleVariantsInputChange = ($event) => { };
    const _handleAddVariant = ($event) => {
        const newVariant = { ingredients: [], sku: "", restrictions: [] };
        const newVariants = [...ingredientsVariants, newVariant];

        setIngredientsVariants(newVariants);
    };
    const _handleDeleteVariant = (variantIndex) => {
        setIngredientsVariants(ingredientsVariants.filter((variant, index) => index !== variantIndex));
    };

    useEffect(() => {
        setRecipeData(recipeData);
    }, [recipeData]);

    const handleGeneralDataChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setgeneralData({
            ...generalData,
            [name]: value,
        });
    };

    const handleAddImageTag = (e) => {
        const newTag = e.target.value;
        if (!!!newTag) {
            setimageTags(imageTags.slice(0, -1));
            return;
        }
        if (imageTags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) return;
        setimageTags([...imageTags, newTag]);
    };

    const handleRemoveImageTag = (imageTagToRemove) => {
        setimageTags(imageTags.filter((tag) => tag !== imageTagToRemove));
    };

    const handleDropFile = (files) => {
        setgeneralData({
            ...generalData,
            image: files,
        });
    };

    const handlePlansChange = (e) => {
        const newPlan = e.target.value;
        if (plans.every((plan) => plan !== newPlan)) {
            setplans([...plans, newPlan]);
        } else {
            setplans(plans.filter((plan) => plan !== newPlan));
        }
    };

    const handleAddWeek = (e, newValue) => {
        if (newValue.length === 0) setweeks(newValue);
        else if (newValue.every((newWeek) => weeks.some((stateWeek) => newWeek === stateWeek))) return;
        else setweeks(newValue);
    };

    const handleRemoveWeek = (weekToRemove) => {
        setweeks(weeks.filter((week) => week !== weekToRemove));
    };

    const handleAddMonth = (e, newValue) => {
        if (newValue.length === 0) setmonths(newValue);
        else if (newValue.every((newMonth) => weeks.some((stateMonth) => newMonth === stateMonth))) return;
        else setmonths(newValue);
    };

    const handleRemoveMonth = (monthToRemove) => {
        setmonths(months.filter((month) => month !== monthToRemove));
    };

    const handleAddTag = (e) => {
        const newTag = e.target.value;
        if (!!!newTag) {
            settags(tag.slice(0, -1));
            return;
        }
        if (tags.some((tag) => tag.toLowerCase() === newTag.toLowerCase())) return;
        settags([...tags, newTag]);
    };

    const handleRemoveTag = (tagToRemove) => {
        settags(tags.filter((tag) => tag !== tagToRemove));
    };

    const handleCreate = async () => {
        setisSubmitting(true);
        const formDataToCreate = new FormData();
        formDataToCreate.append("name", generalData.name);
        formDataToCreate.append("shortDescription", generalData.shortDescription);
        formDataToCreate.append("longDescription", generalData.longDescription);
        formDataToCreate.append("cookDuration", generalData.cookDuration);
        formDataToCreate.append("diffcultyLevel", difficultyLevel);
        formDataToCreate.append("sku", generalData.sku);
        formDataToCreate.append("weight", generalData.weight);
        formDataToCreate.append("recipeImage", generalData.image[0]);
        formDataToCreate.append("tools", JSON.stringify(tools));
        formDataToCreate.append("imageTags", JSON.stringify(imageTags));
        formDataToCreate.append("planIds", JSON.stringify(plans));
        formDataToCreate.append("availableMonths", JSON.stringify(months));
        formDataToCreate.append("backOfficeTags", JSON.stringify(tags));
        formDataToCreate.append(
            "availableWeeksIds",
            JSON.stringify(
                formData.weeks.filter((week) => weeks.some((selectedWeek) => week.label === selectedWeek)).map((week) => week.id)
            )
        );
        formDataToCreate.append("variants", JSON.stringify(ingredientsVariants)); // Because it is an array

        const res = await createRecipe(formDataToCreate);

        if (res.status === 200) {
            enqueueSnackbar("Se ha creado la receta correctamente", {
                variant: "success",
            });

            router.push("/recetas");
        } else {
            enqueueSnackbar(res.data.message, {
                variant: "error",
            });
        }
        setisSubmitting(false);
    };

    const handleAddIngredientsToVariant = (variantIndex, newIngredients) => {
        const newVariants = ingredientsVariants.map((variant, index) => {
            if (index === variantIndex) {
                if (newIngredients.length < variant.ingredients.length) {
                    return {
                        ...variant,
                        ingredients: newIngredients,
                    };
                } else {
                    return {
                        ...variant,
                        ingredients: newIngredients.some((newIngredient) =>
                            variant.ingredients.every((ingredient) => ingredient !== newIngredient)
                        )
                            ? newIngredients
                            : variant.ingredients,
                    };
                }
            } else return variant;
        });

        setIngredientsVariants(newVariants);
    };

    const handleRemoveIngredientFromVariant = (variantIndex, ingredientToRemove) => {
        const newVariants = ingredientsVariants.map((variant, index) => {
            if (index === variantIndex) {
                return {
                    ...variant,
                    ingredients: variant.ingredients.filter((ingredient) => ingredient !== ingredientToRemove),
                };
            } else {
                return variant;
            }
        });

        setIngredientsVariants(newVariants);
    };

    const handleRestrictionsForVariants = (variantIndex, restrictionName, isBeingAdded) => {
        const newVariants = ingredientsVariants.map((variant, index) => {
            if (index === variantIndex) {
                return {
                    ...variant,
                    restrictions: isBeingAdded
                        ? [...variant.restrictions, restrictionName]
                        : variant.restrictions.filter((restriction) => restriction !== restrictionName),
                };
            } else {
                return variant;
            }
        });

        setIngredientsVariants(newVariants);
    };

    const handleEditNutritionalInformation = (params, e) => {
        console.log("Params : ", params);
    };

    const handleAddNutritionalItem = () => {
        const newRow = {
            id: uuidv4(),
            key: "",
            value: "",
        };
        setnutritionalInformation([...nutritionalInformation, newRow]);
    };

    const handleAddTool = (newValues) => {
        if (newValues.length < tools.length) return settools(tools.slice(0, -1));
        if (newValues.length === 0) settools(newValues);
        else if (newValues.every((newTool) => tools.some((stateTool) => newTool === stateTool))) return;
        else settools(newValues);
    };

    const handleRemoveTool = (toolToRemove) => {
        settools(tools.filter((tool) => tool !== toolToRemove));
    };

    return (
        <>
            {/* FORM */}
            {/* FORM LEFT */}
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormPaperWithImageDropzone
                            title="Datos generales"
                            maxFiles={1}
                            handleDropFile={handleDropFile}
                            files={generalData.image}
                            filesTitle="Imagen"
                        >
                            <FormInput label="SKU" name="sku" value={recipeData && recipeData.sku} handleChange={handleGeneralDataChange} />
                            <FormInput
                                label="Nombre de la receta"
                                name="name"
                                value={recipeData && recipeData.name}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput
                                label="Descripción corta"
                                name="shortDescription"
                                rows={3}
                                multiline={true}
                                value={recipeData && recipeData.shortDescription}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput
                                label="Descripción larga"
                                name="longDescription"
                                rows={6}
                                multiline={true}
                                value={recipeData && recipeData.largeDescription}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput
                                label="Tiempo de cocina"
                                name="cookDuration"
                                value={recipeData && recipeData.cookDuration}
                                handleChange={handleGeneralDataChange}
                            />
                            <Autocomplete
                                label="Nivel de dificultad"
                                name="difficultyLevel"
                                options={difficultyLevelOptions.map((dl) => ({ title: dl, value: dl }))}
                                value={difficultyLevel}
                                onChange={(e, newDifficultyLevel) => setdifficultyLevel(newDifficultyLevel)}
                            />
                            <FormInput
                                label="Peso del plato"
                                name="weight"
                                value={recipeData && recipeData.weight}
                                handleChange={handleGeneralDataChange}
                            />
                            <MultiChipInput
                                label="Herramientas necesarias"
                                name="tools"
                                freeSolo
                                options={toolsOptions}
                                values={tools}
                                onChange={(e, newValues) => handleAddTool(newValues)}
                                handleRemoveValue={handleRemoveTool}
                            />
                        </FormPaperWithImageDropzone>
                    </Grid>


                    {/* FORM LEFT BOTTOM, INGREDIENTS */}

                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Ingredientes">
                            <Grid container spacing={2}>
                                {ingredientsVariants.map((variant, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing(1) }}>
                                                <Typography variant="subtitle2">
                                                    Variante {`${index + 1}`} {index === 0 && "- Por defecto"}
                                                </Typography>
                                                {index !== 0 && (
                                                    <IconButton style={{ padding: '4px' }} onClick={() => _handleDeleteVariant(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <FormInput
                                                    name={`ingredientsVariantsCode:${index}`}
                                                    value={`RE0031-${index}`}
                                                    handleChange={_handleVariantsInputChange}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <MultiChipInput
                                                    options={formData.ingredients}
                                                    values={variant.ingredients}
                                                    onChange={(e, newIngredient) => handleAddIngredientsToVariant(index, newIngredient)}
                                                    name={`variant:${index}`}
                                                    handleRemoveValue={(ingredientToRemove) =>
                                                        handleRemoveIngredientFromVariant(index, ingredientToRemove)
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', flexFlow: 'wrap' }}>
                                                {ingredientsPrograms.map((program, index) => (
                                                    <FormControlLabel
                                                        style={{ margin: '0px' }}
                                                        control={
                                                            <Checkbox
                                                                onChange={(e) =>
                                                                    handleRestrictionsForVariants(
                                                                        index,
                                                                        e.target.name,
                                                                        variant.restrictions.every((restriction) => restriction !== program)
                                                                    )
                                                                }
                                                                name={program}
                                                                color="primary"
                                                                value={variant.restrictions.some((restriction) => restriction === program)}
                                                                checked={variant.restrictions.some(
                                                                    (restriction) => restriction === program
                                                                )}
                                                            />
                                                        }
                                                        label={program}
                                                    />
                                                ))}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: theme.spacing(3) }}>
                                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={_handleAddVariant}>
                                    Agregar variante
                            </Button>
                            </Grid>
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>

            {/* FORM  RIGHT */}
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Tags en imagen">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                values={imageTags}
                                onChange={handleAddImageTag}
                                name="imageTags"
                                handleRemoveValue={handleRemoveImageTag}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Información nutricional">
                            <NutritionalInformationGrid
                                handleAddItem={handleAddNutritionalItem}
                                handleRowEdit={handleEditNutritionalInformation}
                                rows={nutritionalInformation}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <FormPaperWithEmptyState
                            fullWidth={true}
                            title={"Planes relacionados"}
                            empty={formData.plans.length === 0}
                            emptyText={"Aún no hay planes creados"}
                        >
                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                {formData.plans.map((plan) => (
                                    <Checkbox
                                        key={plan.id}
                                        label={plan.name}
                                        onChange={handlePlansChange}
                                        checked={plans.some((id) => id === plan.id.toString())}
                                        value={plan.id}
                                    />
                                ))}
                            </Box>
                        </FormPaperWithEmptyState>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Calendario">
                            <MultiChipInput
                                options={formData.weeks.map((week) => week.label)}
                                values={weeks}
                                onChange={handleAddWeek}
                                handleRemoveValue={handleRemoveWeek}
                                name="imageTags"
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Meses de disponibilidad">
                            <MultiChipInput
                                options={formData.months}
                                values={months}
                                onChange={handleAddMonth}
                                handleRemoveValue={handleRemoveMonth}
                                name="months"
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Tags">
                            <MultiChipInput
                                options={[]}
                                freeSolo={true}
                                values={tags}
                                onChange={handleAddTag}
                                name="tags"
                                handleRemoveValue={handleRemoveTag}
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <BackAndCreateButtons
                    backButtonHandler={() => ""}
                    createButtonHandler={handleCreate}
                    createButtonText="CREAR RECETA"
                // isCreateButtonDisabled={!isFormOkForCreation()}
                />
            </Grid>
        </>
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

const ingredientsPrograms = ["Sin glúten", "Sin lactosa", "Apto vegetariano", "Acto vegano"];
const difficultyLevelOptions = ["Facil", "Media", "Alta"];
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
