// Utils / config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { deleteRecipeVariant, updateRecipe } from "../../../../helpers/serverRequests/recipe";

// External components
import { Button, IconButton, Grid, makeStyles, useTheme, Typography, FormControlLabel, Box, RadioGroup, Radio } from "@material-ui/core";
import { Flag as FlagIcon, ArrowBack, Add as AddIcon, Delete } from "@material-ui/icons";

// Internal components

// Internal components
import FormInput from "../../../atoms/input/input";
import Autocomplete from "../../../atoms/autocomplete/autocomplete";
import MultiChipInput from "../../../atoms/multipleChipInput/multipleChipInput";
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import FormPaperWithEmptyState from "../../../molecules/formPaperWithEmptyState/formPaperWithEmptyState";
import Checkbox from "../../../atoms/checkbox/checkbox";
import BackAndCreateButtons from "../../../molecules/backAndCreateButtons/backAndCreateButtons";
import NutritionalInformationGrid from "../../../molecules/nutritionalInformationGrid/nutritionalInformationGrid";
import FIleDraggable from "components/molecules/fileDraggableDropZone/fileDraggableDropZone";
import { getImagesFilesFromUrl } from "helpers/utils/images";
import RecipeVariantEditor from "components/molecules/recipeForm/recipeVariantEditor";
import DeleteRecipeVariantModal from "./deleteRecipeVariantModal";
import { toolsOptions } from "components/molecules/recipeForm/recipeForm";

const RecipeForm = ({ formData, recipeData, handleClickGoBack }) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [ingredientsVariants, setIngredientsVariants] = useState([]); // {ingredients: [], sku: "", restrictions: []}
    const [imageTags, setimageTags] = useState<string[]>([]);
    const [selectedRecipeVariant, setSelectedRecipeVariant] = useState(null);
    const [tags, settags] = useState([]);
    const [weeks, setweeks] = useState([]);
    const [months, setmonths] = useState([]);
    const [isDeleteVariantModalOpen, setIsDeleteVariantModalOpen] = useState(false);
    const [generalData, setgeneralData] = useState({
        name: "",
        sku: "",
        shortDescription: "",
        longDescription: "",
        cookDuration: "",
        weight: "",
        images: [],
        previousImages: [],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [tools, settools] = useState([]);
    const [difficultyLevel, setdifficultyLevel] = useState("");
    const [orderPriority, setOrderPriority] = useState("");
    const [plans, setplans] = useState([]);
    const [nutritionalInformation, setnutritionalInformation] = useState<{ key: string; value: string; id: string }[]>([]);
    const [isSubmitting, setisSubmitting] = useState(false);
    const _handleAddVariant = ($event) => {
        const newVariant = {
            ingredients: ingredientsVariants.length > 0 ? [...ingredientsVariants[ingredientsVariants.length - 1].ingredients] : [],
            sku: "",
            restriction:
                ingredientsVariants.length > 0
                    ? ""
                    : formData.restrictions.find((restriction) => restriction.value === "apto_todo")?.id || "",
            isNew: true,
        };
        const newVariants = [...ingredientsVariants, newVariant];

        setIngredientsVariants(newVariants);
    };

    const handleDeleteVariantClick = (recipeVariant, variantIndex) => {
        if (!recipeVariant.isNew) {
            setIsDeleteVariantModalOpen(true);
            setSelectedRecipeVariant(recipeVariant);
        } else {
            setIngredientsVariants(ingredientsVariants.filter((variant, index) => index !== variantIndex));
        }
    };

    const _handleDeleteVariant = async () => {
        const res = await deleteRecipeVariant(selectedRecipeVariant.sku);

        if (res && res.status === 200) {
            setIsDeleteVariantModalOpen(false);
            setSelectedRecipeVariant(null);
            enqueueSnackbar("La variante se ha eliminado correctamente", { variant: "success" });
            setIngredientsVariants(ingredientsVariants.filter((variant, index) => index !== selectedRecipeVariant.index));
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado, intente nuevamente", { variant: "error" });
        }
    };

    const handleDeleteVariantModalClose = () => {
        setIsDeleteVariantModalOpen(false);
        setSelectedRecipeVariant(null);
    };

    useEffect(() => {
        const initializeRecipe = async () => {
            const recipeImages = await getImagesFilesFromUrl(recipeData.imagesUrls);
            setIngredientsVariants(
                recipeData.recipeVariants.map((variant) => ({
                    ingredients: variant.rawIngredients,
                    sku: variant.sku,
                    restriction: variant.restriction.id,
                }))
            );
            setimageTags(recipeData.imageTags);
            setOrderPriority(recipeData.orderPriority);
            settags(recipeData.backOfficeTags);
            setweeks(recipeData.availableWeeks.map((week) => week.label)); // TO DO: Handle the whole structure instead of lables
            setmonths(recipeData.availableMonths);
            setnutritionalInformation(recipeData.nutritionalInfo);
            settools(recipeData.tools);
            setplans(recipeData.relatedPlans);
            setdifficultyLevel(recipeData.difficultyLevel);
            setgeneralData({
                name: recipeData.name,
                cookDuration: recipeData.cookDurationNumberValue,
                // image: [recipeData.imageUrl], // TO DO: Save the file
                shortDescription: recipeData.shortDescription,
                longDescription: recipeData.longDescription,
                sku: recipeData.sku,
                weight: recipeData.weightNumberValue,
                images: recipeImages,
                previousImages: recipeImages,
            });

            setIsLoading(false);
        };

        initializeRecipe();
    }, []);
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
        if (imageTags.some((tag: string) => tag.toLowerCase() === newTag.toLowerCase())) return;
        setimageTags([...imageTags, newTag]);
    };

    const handleRemoveImageTag = (imageTagToRemove: string) => {
        setimageTags(imageTags.filter((tag: string) => tag.toLowerCase() !== imageTagToRemove.toLowerCase()));
    };

    // const handleDropFile = (files) => {
    //     setgeneralData({
    //         ...generalData,
    //         image: files,
    //     });
    // };

    const handlePlansChange = (e) => {
        const newPlanId = e.target.value;
        if (plans.every((id) => id !== newPlanId)) {
            setplans([...plans, newPlanId]);
        } else {
            setplans(plans.filter((id) => id !== newPlanId));
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
        formDataToCreate.append("orderPriority", orderPriority);
        formDataToCreate.append(
            "availableWeeksIds",
            JSON.stringify(
                formData.weeks.filter((week) => weeks.some((selectedWeek) => week.label === selectedWeek)).map((week) => week.id)
            )
        );
        formDataToCreate.append("nutritionalInfo", JSON.stringify(nutritionalInformation));
        formDataToCreate.append(
            "variants",
            JSON.stringify(ingredientsVariants.map((variant) => ({ ...variant, ingredients: variant.ingredients.map((ing) => ing.id) })))
        ); // Because it is an array

        const res = await updateRecipe(recipeData.id, formDataToCreate, router.locale);

        if (res.status === 200) {
            enqueueSnackbar("Se ha modificado la receta correctamente", {
                variant: "success",
            });
            setIngredientsVariants(ingredientsVariants.map((variant) => ({ ...variant, isNew: false })));
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

    return isLoading ? (
        <></>
    ) : (
        <>
            {/* FORM LEFT */}
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <PaperWithTitleContainer title="Datos generales" fullWidth={true}>
                            <FormInput
                                label="Nombre de la receta"
                                name="name"
                                value={generalData.name}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput label="SKU" name="sku" value={generalData.sku} handleChange={handleGeneralDataChange} />

                            <FormInput
                                label="Descripción corta"
                                name="shortDescription"
                                rows={5}
                                multiline={true}
                                value={generalData.shortDescription}
                                handleChange={handleGeneralDataChange}
                            />

                            <FormInput
                                label="Descripción larga"
                                name="longDescription"
                                rows={5}
                                multiline={true}
                                value={generalData.longDescription}
                                handleChange={handleGeneralDataChange}
                            />
                            <FormInput
                                label="Tiempo de cocina"
                                name="cookDuration"
                                value={generalData.cookDuration}
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
                                value={generalData.weight}
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
                                files={generalData.image}
                                fileName={generalData.name}
                            /> */}
                            <FIleDraggable
                                handleData={(name, files) => setgeneralData({ ...generalData, [name]: files })}
                                previousImages={generalData.previousImages}
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
                                    <RecipeVariantEditor
                                        index={index}
                                        handleDeleteVariantClick={handleDeleteVariantClick}
                                        handleVariantSkuChange={handleVariantSkuChange}
                                        handleAddIngredientsToVariant={handleAddIngredientsToVariant}
                                        handleRemoveIngredientFromVariant={handleRemoveIngredientFromVariant}
                                        handleRestrictionsForVariants={handleRestrictionsForVariants}
                                        variant={variant}
                                        restrictions={formData.restrictions}
                                        ingredients={formData.ingredients}
                                        ingredientsVariants={ingredientsVariants}
                                    />
                                ))}
                            </Grid>
                            {ingredientsVariants.length < formData.restrictions.length && (
                                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={_handleAddVariant}>
                                    Agregar variante
                                </Button>
                            )}{" "}
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
                                        checked={plans.some((id) => id.toString() === plan.id.toString())}
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
                                name="weeks"
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
                    <Grid item xs={12}>
                        <PaperWithTitleContainer fullWidth={true} title="Orden">
                            <FormInput
                                name="orderPriority"
                                value={orderPriority}
                                handleChange={(e) => setOrderPriority(e.target.value)}
                                label=""
                                type="number"
                            />
                        </PaperWithTitleContainer>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <BackAndCreateButtons
                    backButtonHandler={handleClickGoBack}
                    createButtonHandler={handleCreate}
                    createButtonText="MODIFICAR RECETA"
                    // isCreateButtonDisabled={!isFormOkForCreation()}
                />
            </Grid>

            <DeleteRecipeVariantModal
                handleClose={handleDeleteVariantModalClose}
                handleConfirmButton={_handleDeleteVariant}
                open={isDeleteVariantModalOpen}
            />
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

const difficultyLevelOptions = ["Facil", "Media", "Dificil"];

