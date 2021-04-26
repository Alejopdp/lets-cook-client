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
        image: "",
    });
    const [attributes, setattributes] = useState([]);
    const [variants, setvariants] = useState([]);
    const [otherData, setotherData] = useState({
        isActive: true,
        planType: "",
        frequency: [],
        hasRecipes: false,
    });

    const handleGeneralData = (e) => {
        e.preventDefault();

        setgeneralData({
            ...generalData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOtherData = (e) => {
        e.preventDefault();

        console.log("Prop: ", e.target.name);
        console.log("Value: ", e.target.value);

        setotherData({
            ...otherData,
            [e.target.name]: e.target.value,
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
        if (!e.target.value) return; // Prevents undefined value when removing a chip

        const updatedAttribute = [...attributes[index]];

        if (updatedAttribute[1].every((value) => value !== e.target.value)) {
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

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Grid container spacing={2}>
                    <GeneralData data={generalData} handleChange={handleGeneralData} />
                    <AttributesAndVariants
                        attributes={attributes}
                        variants={variants}
                        handleAddAttribute={handleAddAttribute}
                        handleRemoveAttribute={handleRemoveAttribute}
                        handleKeyChange={handleAttributeKeyChange}
                        handleValuesChange={handleAttributeValuesChange}
                        handleRemoveAttributeValue={handleRemoveAttributeValue}
                    />
                </Grid>
            </Grid>
            <Grid item xs={4} spacing={2}>
                <Others data={otherData} handleChange={handleOtherData} />
            </Grid>
        </Grid>
    );
};

CreatePlanForm.propTypes = {};

export default CreatePlanForm;
