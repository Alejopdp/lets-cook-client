// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import GeneralData from "./generalData";
import AttributesAndVariants from "./attributesAndVariants";
import Others from "./others";

const CreatePlanForm = (props) => {
    const [generalData, setgeneralData] = useState({
        name: "",
        description: "",
        sku: "",
        image: [],
    });
    const [attributes, setattributes] = useState([]);
    const [variants, setvariants] = useState([]);
    const [otherData, setotherData] = useState({
        isActive: "Activo",
        planType: "",
        hasRecipes: false,
    });
    const [frequency, setfrequency] = useState([]);
    const [additionalPlans, setadditionalPlans] = useState([]);

    const handleGeneralData = (e) => {
        e.preventDefault();

        setgeneralData({
            ...generalData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOtherData = (propName, newValue) => {
        setotherData({
            ...otherData,
            [propName]: newValue,
        });
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
            updatedAttribute[1] = [];
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
        if (newValue.length === 0) setfrequency(newValue);
        else if (newValue.every((newFreq) => frequency.some((stateFreq) => newFreq === stateFreq))) return;
        else setfrequency(newValue);
    };

    const handleRemoveFrequency = (freqToRemove) => {
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
        setotherData({
            ...otherData,
            hasRecipes: !otherData.hasRecipes,
        });
    };

    const handleDropFile = (files) => {
        setgeneralData({
            ...generalData,
            image: files,
        });
    };

    const cartesianProduct = (...array) => {
        const processedArray = array.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

        return processedArray;
    };

    const getGridRows = () => {
        const cartesian = cartesianProduct(...attributes.map((attr) => attr[1]));
        var rows = [];
        var attributesWithFixedFields = [...attributes, ["Precio lista", []], ["Precio oferta", []], ["SKU", []]];

        for (let i = 0; i < cartesian.length; i++) {
            var row = {};

            for (let j = 0; j < attributesWithFixedFields.length; j++) {
                row[attributesWithFixedFields[j][0]] = cartesian[i][j];
                row["id"] = `${i.toString()}${j.toString()}`; // Obligatorio para data-grid
            }
            rows.push(row);
        }

        return rows;
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <GeneralData data={generalData} handleChange={handleGeneralData} handleDropFile={handleDropFile} />
                    <AttributesAndVariants
                        attributes={attributes}
                        variants={variants}
                        handleAddAttribute={handleAddAttribute}
                        handleRemoveAttribute={handleRemoveAttribute}
                        handleKeyChange={handleAttributeKeyChange}
                        handleValuesChange={handleAttributeValuesChange}
                        handleRemoveAttributeValue={handleRemoveAttributeValue}
                        variantsColumns={[
                            ...attributes.map((attr) => {
                                return { field: attr[0], headerName: attr[0] };
                            }),
                            { field: "Precio lista", headerName: "Precio lista", editable: true },
                            { field: "Precio oferta", headerName: "Precio oferta", editable: true },
                            { field: "SKU", headerName: "SKU", editable: true },
                        ]}
                        variantsRows={attributes.length > 0 ? getGridRows() : []}
                    />
                </Grid>
            </Grid>
            <Grid item xs={4} spacing={2}>
                <Others
                    data={otherData}
                    frequency={frequency}
                    handleFrequencyChange={handleFrequencyChange}
                    handleRemoveFrequency={handleRemoveFrequency}
                    handleChange={handleOtherData}
                    additionalPlans={additionalPlans}
                    handleAdditionalPlansChange={handleAdditionalPlansChange}
                    handleHasRecipes={handleHasRecipes}
                />
            </Grid>
        </Grid>
    );
};

CreatePlanForm.propTypes = {};

export default CreatePlanForm;
