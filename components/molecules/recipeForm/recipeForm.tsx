// Utils / config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";
import { createRecipe } from "../../../helpers/serverRequests/recipe";

// External components
import { Button, IconButton, Grid, makeStyles, useTheme, Typography, FormControlLabel, Box, Radio, RadioGroup } from "@material-ui/core";
import { Flag as FlagIcon, ArrowBack as BackIcon, Add as AddIcon, Delete } from "@material-ui/icons";

// Internal components
import FormInput from "../../atoms/input/input";
import Autocomplete from "../../atoms/autocomplete/autocomplete";
import MultiChipInput from "../../atoms/multipleChipInput/multipleChipInput";
import FormPaperWithImageDropzone from "../formPaperWithImageDropzone/formPaperWithImageDropzone";
import PaperWithTitleContainer from "../paperWithTitleContainer/paperWithTitleContainer";
import ButtonDropdownMenu from "../buttonDropdownMenu/ButtonDropdownMenu";
import FormPaperWithEmptyState from "../formPaperWithEmptyState/formPaperWithEmptyState";
import Checkbox from "../../atoms/checkbox/checkbox";
import BackAndCreateButtons from "../backAndCreateButtons/backAndCreateButtons";
import NutritionalInformationGrid from "../nutritionalInformationGrid/nutritionalInformationGrid";
import Dropzone from "../dropzone/dropzone";
import FIleDraggable from "../fileDraggableDropZone/fileDraggableDropZone";

const useStyles = makeStyles((theme) => ({
    height100: {
        minHeight: "100%",
    },
    space: {
        height: theme.spacing(2),
    },
}));

const RecipeForm = ({ formData, recipeData, handleClickGoBack }) => {
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
        name: "",
        sku: "",
        longDescription: "",
        shortDescription: "",
        cookDuration: "",
        weight: "",
        image: [],
        images: [],
    });
    const [tools, settools] = useState([]);
    const [difficultyLevel, setdifficultyLevel] = useState("");
    const [plans, setplans] = useState([]);
    const [nutritionalInformation, setnutritionalInformation] = useState<{ key: string; value: string }[]>([]);
    const [isSubmitting, setisSubmitting] = useState(false);
    const _handleSelectLang = (lang) => setLang(lang);
    const _handleAddVariant = ($event) => {
        const newVariant = {
            ingredients: ingredientsVariants.length > 0 ? [...ingredientsVariants[ingredientsVariants.length - 1].ingredients] : [],
            sku: "",
            restriction:
                ingredientsVariants.length > 0
                    ? ""
                    : formData.restrictions.find((restriction) => restriction.value === "apto_todo")?.id || "",
        };
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

    function hasDuplicatedRestrictions() {
        const selectedRestrictions = ingredientsVariants.map((variant) => variant.restriction);
        return new Set(selectedRestrictions).size !== selectedRestrictions.length;
    }

    const handleCreate = async () => {
        setisSubmitting(true);

        if (hasDuplicatedRestrictions())
            enqueueSnackbar("No pueden haber 2 o más variantes con la misma restricción", { variant: "error" });

        const formDataToCreate = new FormData();
        formDataToCreate.append("name", generalData.name);
        formDataToCreate.append("longDescription", generalData.longDescription);
        formDataToCreate.append("shortDescription", generalData.shortDescription);
        formDataToCreate.append("cookDuration", generalData.cookDuration);
        formDataToCreate.append("difficultyLevel", difficultyLevel);
        formDataToCreate.append("sku", generalData.sku);
        formDataToCreate.append("weight", generalData.weight);
        generalData.images.forEach((image) => {
            formDataToCreate.append("recipeImages", image);
        });
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
        formDataToCreate.append(
            "variants",
            JSON.stringify(ingredientsVariants.map((variant) => ({ ...variant, ingredients: variant.ingredients.map((ing) => ing.id) })))
        ); // Because it is an array
        formDataToCreate.append("nutritionalInfo", JSON.stringify(nutritionalInformation));

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

    const handleRestrictionsForVariants = (variantIndex, restriction) => {
        const newVariants = ingredientsVariants.map((variant, index) => {
            if (index === variantIndex) {
                return {
                    ...variant,
                    restriction,
                };
            } else {
                return variant;
            }
        });

        setIngredientsVariants(newVariants);
    };

    const handleEditNutritionalInformation = (index: number, keyName: string, value: string) => {
        let tempAttr = [...nutritionalInformation];
        tempAttr[index][keyName] = value;
        setnutritionalInformation(tempAttr);
    };

    const handleAddNutritionalItem = () => {
        setnutritionalInformation([...nutritionalInformation, { key: "", value: "" }]);
    };

    const handleDeleteNutritionalInformationAttribute = (index: number) => {
        const newAttributes = [...nutritionalInformation];

        newAttributes.splice(index, 1);

        setnutritionalInformation(newAttributes);
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

    const handleVariantSkuChange = (variantIndex, newValue) => {
        setIngredientsVariants(
            ingredientsVariants.map((variant, index) => {
                if (index === variantIndex) {
                    return {
                        ...variant,
                        sku: newValue,
                    };
                }
                return variant;
            })
        );
    };

    return (
        <>
            {/* FORM LEFT */}
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer title="Datos generales" fullWidth={true}>
                            <FormInput
                                label="Nombre de la receta"
                                name="name"
                                value={recipeData && recipeData.name}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput label="SKU" name="sku" value={recipeData && recipeData.sku} handleChange={handleGeneralDataChange} />

                            <FormInput
                                label="Descripción corta"
                                name="shortDescription"
                                rows={6}
                                multiline={true}
                                value={recipeData && recipeData.largeDescription}
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
                                type="number"
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
                            {/* <Dropzone
                                title="Imagenes de la receta"
                                maxFiles={10}
                                handleDropFile={handleDropFile}
                                files={generalData.images}
                                fileName={generalData.name}
                            /> */}
                            <FIleDraggable
                                handleData={(name, files) => setgeneralData({ ...generalData, [name]: files })}
                                previousImages={[]}
                                hasPreviousImages={false}
                                name="images"
                                files={generalData.images}
                            />
                        </PaperWithTitleContainer>
                    </Grid>

                    {/* FORM LEFT BOTTOM, INGREDIENTS */}

                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Ingredientes">
                            <Grid container spacing={2}>
                                {ingredientsVariants.map((variant, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={12}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    marginBottom: theme.spacing(1),
                                                }}
                                            >
                                                <Typography variant="subtitle2">
                                                    Variante {`${index + 1}`} {index === 0 && "- Por defecto"}
                                                </Typography>
                                                {index !== 0 && (
                                                    <IconButton style={{ padding: "4px" }} onClick={() => _handleDeleteVariant(index)}>
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <FormInput
                                                    name={`ingredientsVariantsCode:${index}`}
                                                    value={variant.sku}
                                                    handleChange={(e) => handleVariantSkuChange(index, e.target.value)}
                                                    label="SKU"
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <MultiChipInput
                                                    complexOptions={true}
                                                    options={formData.ingredients}
                                                    values={variant.ingredients}
                                                    onChange={(e, newIngredient) => handleAddIngredientsToVariant(index, newIngredient)}
                                                    name={`variant:${index}`}
                                                    label="Ingredientes"
                                                    handleRemoveValue={(ingredientToRemove) =>
                                                        handleRemoveIngredientFromVariant(index, ingredientToRemove)
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid
                                                item
                                                xs={12}
                                                style={{ display: "flex", justifyContent: "space-between", flexFlow: "wrap" }}
                                            >
                                                <RadioGroup
                                                    aria-label="gender"
                                                    name="Restrictions"
                                                    value={variant.restriction}
                                                    onChange={(e) => handleRestrictionsForVariants(index, e.target.value)}
                                                    style={{ flexDirection: "row" }}
                                                >
                                                    {formData.restrictions.map((variantRestriction, restrictionIndex) => (
                                                        <FormControlLabel
                                                            key={restrictionIndex}
                                                            value={variantRestriction.id}
                                                            disabled={
                                                                (ingredientsVariants.some(
                                                                    (variant) => variant.restriction === variantRestriction.id
                                                                ) &&
                                                                    variant.restriction !== variantRestriction.id) ||
                                                                (index === 0 && variantRestriction.value !== "apto_todo")
                                                            }
                                                            control={<Radio />}
                                                            label={variantRestriction.label}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: theme.spacing(3) }}>
                                {ingredientsVariants.length < formData.restrictions.length && (
                                    <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={_handleAddVariant}>
                                        Agregar variante
                                    </Button>
                                )}
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
                                handleDeleteAttribute={handleDeleteNutritionalInformationAttribute}
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
                                        handleChange={handlePlansChange}
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
                    backButtonHandler={handleClickGoBack}
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

const difficultyLevelOptions = ["Facil", "Media", "Dificil"];
export const toolsOptions = ["Bandeja de horno", "Batidora",
"Batidora (opcional)",
"Batidora o minipimer",
"Bol",
"Bol grande",
"Bol grande x2",
"Bol pequeño",
"Bol pequeño x2",
"Bol x2",
"Bol x3",
"Bol x4",
"Bol x5",
"Colador",
"Colador (opcional)",
"Cuchillo",
"Ensaladera",
"Ensaladera x2",
"Espumadera",
"Espumadera (opcional)",
"Exprimidor",
"Exprimidor (opcional)",
"Fuente de horno",
"Fuente de horno (opcional)",
"Fuente de horno x2",
"Fuente de horno x3",
"Fuente de horno x4",
"Fuente de horno x5",
"Minipimer",
"Minipimer (opcional)",
"Minipimer o batidora",
"Minipimer o mortero",
"Molde",
"Molde (opcional)",
"Olla",
"Olla con tapa",
"Olla con tapa x2",
"Olla grande",
"Olla grande x2",
"Olla o sartén",
"Olla o sartén con tapa",
"Olla o sartén grande",
"Olla o sartén grande con tapa",
"Olla o sartén pequeña con tapa",
"Olla pequeña",
"Olla pequeña x2",
"Olla x2",
"Olla x3",
"Olla x4",
"Olla x5",
"Palillos",
"Palillos (opcional)",
"Papel aluminio",
"Papel aluminio (opcional)",
"Papel vegetal",
"Papel vegetal (opcional)",
"Parrilla o sartén",
"Parrilla o sartén con tapa",
"Parrilla o sartén grande",
"Parrilla o sartén grande con tapa",
"Parrilla o sartén pequeña con tapa",
"Pelador",
"Pelador (opcional)",
"Plancha o sartén",
"Plancha o sartén con tapa",
"Plancha o sartén grande",
"Plancha o sartén grande con tapa",
"Plancha o sartén pequeña con tapa",
"Plato hondo",
"Plato hondo x2",
"Plato hondo x3",
"Plato hondo x4",
"Plato hondo x5",
"Rallador",
"Rallador (opcional)",
"Sartén",
"Sartén con tapa",
"Sartén con tapa x2",
"Sartén grande",
"Sartén grande x2",
"Sartén pequeña",
"Sartén pequeña x2",
"Sartén x2",
"Sartén x3",
"Sartén x4",
"Sarten x5",
"Tabla de cortar",
"Tapa",
"Tapas",
"Taza",
"Taza x2",
"Taza x3",
"Taza x4",
"Taza x5",
"Tazas",
"Tijera",
"Tijera (opcional)",
"Vaso",
"Vasos",
"Wok",
"Wok con tapa",
"Wok con tapa x2",
"Wok grande",
"Wok grande x2",
"Wok o sartén",
"Wok o sartén con tapa",
"Wok o sartén grande",
"Wok o sartén grande con tapa",
"Wok o sartén pequeña con tapa",
"Wok pequeño",
"Wok pequeño x2",
"Wok x2",
"Wok x3",
"Wok x4",
"Wok x5"]
;

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
