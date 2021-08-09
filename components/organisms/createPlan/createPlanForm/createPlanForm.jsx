// Utils & config
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { createPlan } from "../../../../helpers/serverRequests/plan";
import { useRouter } from "next/router";
import { PlanFrequencyValue } from "../../../../helpers/types/frequency";

// External components
import Grid from "@material-ui/core/Grid";
import RadioButton from "@material-ui/core/Radio";

// Internal components
import GeneralData from "./generalData";
import AttributesAndVariants from "./attributesAndVariants";
import Others from "./others";
import BackAndCreateButtons from "../../../molecules/backAndCreateButtons/backAndCreateButtons";
import EnabledOrDisabledIconButton from "../../../atoms/enabledOrDisabledIconButton/enabledOrDisabledIconButton";

const CreatePlanForm = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [generalData, setgeneralData] = useState({
        name: "",
        description: "",
        slug: "",
        sku: "",
        image: [],
        iconColor: [],
        iconByg: [],
    });
    const [attributes, setattributes] = useState([]);
    const [variants, setvariants] = useState([]);
    const [otherData, setotherData] = useState({
        isActive: "",
        planType: "",
        hasRecipes: false,
        abilityToChooseRecipes: false,
    });
    const [frequency, setfrequency] = useState([]);
    const [additionalPlans, setadditionalPlans] = useState([]);
    const [isSubmitting, setisSubmitting] = useState(false);

    useEffect(() => {
        setGridRows();
    }, [attributes]);

    const handleGeneralData = (e) => {
        e.preventDefault();

        setgeneralData({
            ...generalData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOtherData = (propName, newValue) => {
        if (isUserSelectingPlanTypePrincipal) {
            addPersonasAndRecetasAttributes();
            addSemanalFrequency();
            setotherData({
                ...otherData,
                [propName]: newValue,
                hasRecipes: true,
            });

            return;
        }

        setotherData({
            ...otherData,
            [propName]: newValue,
        });
    };

    const isUserSelectingPlanTypePrincipal = (propName, newValue) => {
        return propName === "planType" && newValue === "Principal";
    };

    const addPersonasAndRecetasAttributes = () => {
        const attributesToAdd = [];
        if (attributes.every((attr) => attr[0] !== "Personas")) attributesToAdd.push(["Personas", []]);
        if (attributes.every((attr) => attr[0] !== "Recetas")) attributesToAdd.push(["Recetas", []]);

        setattributes([...attributesToAdd, ...attributes]);
    };

    const addSemanalFrequency = () => {
        if (frequency.some((freq) => freq === PlanFrequencyValue.WEEKLY)) return;
        setfrequency([PlanFrequencyValue.WEEKLY, ...frequency]);
    };

    const handleAddAttribute = () => {
        setattributes([...attributes, [[], []]]);
    };

    const handleRemoveAttribute = (index) => {
        const newAttributes = [];
        var count = 0;

        for (let attr of attributes) {
            if (index === count) {
            } else {
                newAttributes.push(attr);
            }
            count++;
        }

        setattributes(newAttributes);
    };

    const handleAttributeKeyChange = (index, e) => {
        const updatedAttribute = [...attributes[index]];

        updatedAttribute[0] = e.target.value;
        updateAttributes(updatedAttribute, index);
    };

    const handleAttributeValuesChange = (index, e) => {
        var updatedAttribute = [...attributes[index]];
        if (!e.target.value) {
            updatedAttribute[1] = updatedAttribute[1].slice(0, -1);

            updateAttributes(updatedAttribute, index);
        } else if (updatedAttribute[1].every((value) => value !== e.target.value)) {
            updatedAttribute[1] = [...updatedAttribute[1], e.target.value];
            updateAttributes(updatedAttribute, index);
        } else {
            return;
        }
    };

    const handleRemoveAttributeValue = (index, value) => {
        const updatedAttribute = [...attributes[index]];

        updatedAttribute[1] = updatedAttribute[1].filter((val) => val !== value);
        updateAttributes(updatedAttribute, index);
    };

    const handleFrequencyChange = (e, newValue) => {
        if (newValue.length === 0) setfrequency(isPlanTypePrincipal() ? [PlanFrequencyValue.WEEKLY] : []);
        else if (newValue.every((newFreq) => frequency.some((stateFreq) => newFreq === stateFreq))) return;
        else setfrequency(newValue);
    };

    const isPlanTypePrincipal = () => otherData.planType === "Principal";

    const handleRemoveFrequency = (freqToRemove) => {
        if (freqToRemove === PlanFrequencyValue.WEEKLY && isPlanTypePrincipal()) return;
        setfrequency(frequency.filter((freq) => freq !== freqToRemove));
    };

    const updateAttributes = (attribute, index) => {
        const newAttributes = [];
        var count = 0;

        for (let attr of attributes) {
            if (count === index) {
                newAttributes.push(attribute);
            } else {
                newAttributes.push([...attr]);
            }
            count++;
        }
        setattributes(newAttributes);
    };

    const handleAdditionalPlansChange = (e) => {
        if (additionalPlans.every((plan) => plan !== e.target.value)) {
            setadditionalPlans([...additionalPlans, e.target.value]);
        } else {
            setadditionalPlans(additionalPlans.filter((plan) => plan !== e.target.value));
        }
    };

    const handleHasRecipes = () => {
        const newValue = !otherData.hasRecipes;

        setotherData({
            ...otherData,
            hasRecipes: isPlanTypePrincipal() ? true : newValue,
        });

        if (newValue) addRecetasAttribute();
    };

    const addRecetasAttribute = () => {
        if (attributes.every((attr) => attr[0] !== "Recetas")) setattributes([...attributes, ["Recetas", []]]);
    };

    const handleAbilityToChooseRecipes = () => {
        setotherData({
            ...otherData,
            abilityToChooseRecipes: !otherData.abilityToChooseRecipes,
        });
    };

    const handleDropFileImage = (files) => {
        setgeneralData({
            ...generalData,
            image: files,
        });
    };

    const handleDropFileIconColor = (files) => {
        setgeneralData({
            ...generalData,
            iconColor: files,
        });
    };

    const handleDropFileIconByg = (files) => {
        setgeneralData({
            ...generalData,
            iconByg: files,
        });
    };

    const cartesianProduct = (...array) => {
        if (array.length === 0) return [];
        const processedArray = array.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

        return processedArray;
    };

    const onlyOneAttributeWithValues = () => {
        return attributes.filter((attr) => attr[1].length > 0).length === 1;
    };

    const setGridRows = () => {
        const baseCartesian = cartesianProduct(...attributes.filter((attr) => attr[1].length > 0).map((attr) => attr[1]));
        const cartesian = onlyOneAttributeWithValues() ? baseCartesian.map((item) => [item]) : baseCartesian;
        var rows = [];
        var attributesWithFixedFields = [...attributes, ["price", 0], ["priceWithOffer", 0], ["sku", ""]];

        for (let i = 0; i < cartesian.length; i++) {
            var row = {};
            let id = Array.isArray(cartesian[i])
                ? cartesian[i].reduce((acc, actualValue) => acc + actualValue, "")
                : [cartesian[i]].reduce((acc, actualValue) => acc + actualValue, "");
            row["id"] = id; // Obligatorio para data-grid

            for (let j = 0; j < attributesWithFixedFields.length; j++) {
                let columnName = attributesWithFixedFields[j][0];

                if (
                    columnName === "price" ||
                    columnName === "priceWithOffer" ||
                    columnName === "sku" ||
                    columnName === "description" ||
                    columnName === "isDefault"
                ) {
                    let variant = variants.find((variant) => variant.id === id);
                    row[columnName] = !!variant ? variant[columnName] : cartesian[i][j];
                } else {
                    row[columnName] = cartesian[i][j];
                }
            }
            rows.push(row);
        }
        setvariants(rows);

        return rows;
    };

    const handleVariantsEdit = (params, e) => {
        // e.preventDefault();
        if (params.field === "isDefault") {
            handleDefaultVariantChange(params);
            return;
        }

        if (params.field === "deleted") {
            handleDeleteVariantChange(params);
            return;
        }

        const newVariants = variants.map((variant) => {
            if (variant.id === params.id) {
                return {
                    ...variant,
                    [params.field]: params.field === "deleted" ? !variant.deleted || false : params.props.value,
                };
            } else {
                return {
                    ...variant,
                };
            }
        });

        setvariants(newVariants);
    };

    const handleDefaultVariantChange = (params) => {
        const newVariants = variants.map((variant) => {
            if (variant.id === params.id) {
                return {
                    ...variant,
                    isDefault: true,
                };
            } else {
                return {
                    ...variant,
                    isDefault: false,
                };
            }
        });

        setvariants(newVariants);
    };

    const handleDeleteVariantChange = (params) => {
        const newVariants = variants.map((variant) => {
            if (variant.id === params.id) {
                return {
                    ...variant,
                    deleted: !variant.deleted || false,
                    isDefault: !variant.deleted ? false : variant.isDefault,
                };
            } else {
                return {
                    ...variant,
                };
            }
        });

        setvariants(newVariants);
    };

    const handleCreate = async () => {
        setisSubmitting(true);
        const formData = new FormData();
        formData.append("name", generalData.name);
        formData.append("description", generalData.description);
        formData.append("sku", generalData.sku);
        formData.append("planImage", generalData.image[0]);
        formData.append("icon", generalData.iconByg[0]);
        formData.append("iconWithColor", generalData.iconColor[0]);
        formData.append("planSlug", generalData.slug);
        formData.append("abilityToChooseRecipes", otherData.abilityToChooseRecipes);
        formData.append("isActive", JSON.stringify(otherData.isActive === "Activo"));
        formData.append("availablePlanFrecuencies", JSON.stringify(frequency)); // Because it is an array
        formData.append("type", otherData.planType);
        formData.append("hasRecipes", JSON.stringify(otherData.hasRecipes));
        formData.append("variants", JSON.stringify(variants.filter((variant) => !variant.deleted))); // Because it is an array
        formData.append("additionalPlans", JSON.stringify(additionalPlans)); // Because it is an array

        const res = await createPlan(formData);

        if (res.status === 200) {
            enqueueSnackbar("Se ha creado el plan correctamente", {
                variant: "success",
            });

            router.push("/planes");
        } else {
            enqueueSnackbar(res.data.message, {
                variant: "error",
            });
        }
        setisSubmitting(false);
    };

    const isFormOkForCreation = () => {
        return (
            !!generalData.description &&
            !!generalData.image &&
            !!generalData.name &&
            !!generalData.sku &&
            !!otherData.isActive &&
            !!otherData.planType &&
            !!frequency
        );
    };

    const getVariantByRowId = (rowId) => {
        return variants.find((variant) => variant.id === rowId);
    };
    return (
        <>
            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <GeneralData
                        data={generalData}
                        handleChange={handleGeneralData}
                        handleDropFileImage={handleDropFileImage}
                        handleDropFileIconColor={handleDropFileIconColor}
                        handleDropFileIconByg={handleDropFileIconByg}
                    />
                    <AttributesAndVariants
                        attributes={attributes}
                        variants={variants}
                        planType={otherData.planType}
                        hasRecipes={otherData.hasRecipes}
                        handleAddAttribute={handleAddAttribute}
                        handleRemoveAttribute={handleRemoveAttribute}
                        handleKeyChange={handleAttributeKeyChange}
                        handleValuesChange={handleAttributeValuesChange}
                        handleRemoveAttributeValue={handleRemoveAttributeValue}
                        variantsColumns={[
                            ...attributes.map((attr) => {
                                return { field: attr[0], headerName: attr[0] };
                            }),
                            { field: "price", headerName: "Precio lista", editable: true },
                            { field: "priceWithOffer", headerName: "Precio oferta", editable: true },
                            { field: "sku", headerName: "SKU", editable: true },
                            { field: "description", headerName: "Descripción", editable: true },
                            {
                                field: "isDefault",
                                headerName: "Default",
                                renderCell: (params) => (
                                    <RadioButton
                                        style={{ margin: "auto" }}
                                        checked={!!params.value}
                                        onChange={(e) => handleDefaultVariantChange(params, e)}
                                        value={!!params.value}
                                    />
                                ),
                            },
                            {
                                field: "deleted",
                                headerName: "Eliminar",
                                type: "boolean",
                                renderCell: (params) => (
                                    <EnabledOrDisabledIconButton
                                        enabled={getVariantByRowId(params.id).deleted}
                                        onClick={(e) => handleVariantsEdit(params, e)}
                                    />
                                ),
                            },
                        ]}
                        variantsRows={attributes.length > 0 ? variants : []}
                        handleVariantsEdit={handleVariantsEdit}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                    <Others
                        data={otherData}
                        frequency={frequency}
                        handleFrequencyChange={handleFrequencyChange}
                        handleRemoveFrequency={handleRemoveFrequency}
                        handleChange={handleOtherData}
                        additionalPlans={props.additionalPlans}
                        handleAdditionalPlansChange={handleAdditionalPlansChange}
                        handleHasRecipes={handleHasRecipes}
                        handleAbilityToChooseRecipes={handleAbilityToChooseRecipes}
                        selectedAdditionalPlansIds={additionalPlans}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <BackAndCreateButtons
                    backButtonHandler={() => router.replace("/planes", "/planes")}
                    createButtonHandler={handleCreate}
                    createButtonText="CREAR PLAN"
                    isCreateButtonDisabled={!isFormOkForCreation()}
                />
            </Grid>
        </>
    );
};

CreatePlanForm.propTypes = {
    additionalPlans: PropTypes.array.isRequired,
};

export default CreatePlanForm;
