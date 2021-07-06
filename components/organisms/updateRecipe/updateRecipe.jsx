// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import UpdateRecipeForm from "../updateRecipe/updateRecipeForm/updateRecipeForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";
import DashboardTitleWithBackButtonAndLanguageSelector from "../../layout/dashboardTitleWithBackButtonAndLanguageSelector";

const UpdateRecipe = (props) => {
    const router = useRouter();

    const handleChangeLanguage = (language) => {
        router.replace({ pathname: router.pathname, query: router.query }, router.asPath, { locale: language.value });
    };

    const goBackHandler = () => {
        router.replace("/recetas", "/recetas", { locale: router.locale });
    };
    return (
        <>
            <DashboardTitleWithBackButtonAndLanguageSelector title='Modificar receta' handleClick={goBackHandler} handleChangeLanguage={handleChangeLanguage} />
            <UpdateRecipeForm formData={props.formData} recipeData={props.recipeData} />
        </>
    );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;
