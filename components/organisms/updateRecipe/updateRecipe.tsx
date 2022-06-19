// Utils & config
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Internal components
import UpdateRecipeForm from "./updateRecipeForm/updateRecipeForm";
import DashboardTitleWithBackButtonAndLanguageSelector from "../../layout/dashboardTitleWithBackButtonAndLanguageSelector";
import { getRecipeById, getRecipeFormData } from "helpers/serverRequests/recipe";
import { useSnackbar } from "notistack";
import useLocalStorage from "hooks/useLocalStorage/localStorage";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const UpdateRecipe = (props) => {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({});
    const [recipeData, setRecipeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isValidatingPermissions, setIsValidatingPermissions] = useState(true);
    const [hasLoadingError, setHasLoadingError] = useState(false);
    const { getFromLocalStorage } = useLocalStorage();
    const { userInfo } = useUserInfoStore();

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.UPDATE_RECIPE)) router.back();

        setIsValidatingPermissions(false);
    }, [userInfo]);

    useEffect(() => {
        const getRecipeData = async () => {
            const [res, formDataRes] = await Promise.all([
                getRecipeById(getFromLocalStorage("token"), router.query.id, router.locale),
                getRecipeFormData(getFromLocalStorage("token"), router.locale),
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
            {!isLoading && !hasLoadingError && !isValidatingPermissions && (
                <UpdateRecipeForm formData={formData} recipeData={recipeData} handleClickGoBack={goBackHandler} />
            )}
        </>
    );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;
