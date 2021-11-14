// Utils & config
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import UpdateRecipeForm from "./updateRecipeForm/updateRecipeForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton";
import DashboardTitleWithBackButtonAndLanguageSelector from "../../layout/dashboardTitleWithBackButtonAndLanguageSelector";
import { getRecipeById, getRecipeFormData } from "helpers/serverRequests/recipe";
import { useSnackbar } from "notistack";

const UpdateRecipe = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({});
    const [recipeData, setRecipeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasLoadingError, setHasLoadingError] = useState(false);

    useEffect(() => {
        const getRecipeData = async () => {
            const [res, formDataRes] = await Promise.all([
                getRecipeById("", router.query.id, router.locale),
                getRecipeFormData("", router.locale),
            ]);

            if (res && res.status === 200) {
                setRecipeData(res.data);
            } else {
                setHasLoadingError(true);
                enqueueSnackbar("Ocurrió un error inesperado", { variant: "error" });
                return;
            }

            if (formDataRes && formDataRes.status === 200) {
                setFormData(formDataRes.data);
            } else {
                setHasLoadingError(true);
                enqueueSnackbar("Ocurrió un error inesperado", { variant: "error" });
                return;
            }

            setIsLoading(false);
        };

        setIsLoading(true);
        getRecipeData();
    }, [router.locale]);

    const handleChangeLanguage = (language) => {
        console.log("Changing to: ", language);
        router.replace({ pathname: router.pathname, query: router.query }, router.asPath, { locale: language.value });
    };

    const goBackHandler = () => {
        router.replace("/recetas", "/recetas", { locale: router.locale });
    };
    return (
        <>
            <DashboardTitleWithBackButtonAndLanguageSelector
                title="Modificar receta"
                handleClick={goBackHandler}
                handleChangeLanguage={handleChangeLanguage}
            />
            {!isLoading && !hasLoadingError && (
                <UpdateRecipeForm formData={formData} recipeData={recipeData} handleClickGoBack={goBackHandler} />
            )}
        </>
    );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;
