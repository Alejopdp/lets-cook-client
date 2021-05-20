// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
const langs = require("../../../lang").createRecipe;

// External components

// Internal components
import CreateRecipeForm from "../../molecules/recipeForm/recipeForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";


const CreateRecipe = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];

    const goBackHandler = () => {
        router.replace("/recetas", "/recetas", { locale: router.locale });
    };

    return (
        <>
            <DashboardTitle title={lang.title} handleClick={goBackHandler} />
            <CreateRecipeForm formData={props.formData} recipeData={props.recipeData} />
        </>
    );
};

CreateRecipe.propTypes = {};

export default CreateRecipe;
