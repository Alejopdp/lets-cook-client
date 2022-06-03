// Utils & config
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
const langs = require("../../../lang").createRecipe;

// External components

// Internal components
import CreateRecipeForm from "../../molecules/recipeForm/recipeForm";
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";
import { useUserInfoStore } from "stores/auth";
import { Permission } from "helpers/types/permission";

const CreateRecipe = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [isLoading, setIsLoading] = useState(true);
    const { userInfo } = useUserInfoStore();

    useEffect(() => {
        if (!Array.isArray(userInfo.permissions)) return;
        if (!userInfo.permissions.includes(Permission.CREATE_RECIPE)) router.back();

        setIsLoading(false);
    }, [userInfo]);

    const goBackHandler = () => {
        router.replace("/recetas", "/recetas", { locale: router.locale });
    };

    return (
        <>
            <DashboardTitle title={lang.title} handleClick={goBackHandler} />
            {!isLoading && <CreateRecipeForm formData={props.formData} recipeData={props.recipeData} handleClickGoBack={goBackHandler} />}
        </>
    );
};

export default CreateRecipe;
