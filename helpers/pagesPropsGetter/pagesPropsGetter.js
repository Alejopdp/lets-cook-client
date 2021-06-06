import { getRoleList } from "../serverRequests/role";
import { getUserById, getUserList } from "../serverRequests/user";
import { getAdditionalPlans, getPlanById, getPlanList } from "../serverRequests/plan";
import { getRecipes, getRecipesFilterOptions, getRecipeFormData, getRecipeById } from "../serverRequests/recipe";
import { getZonesList } from "../serverRequests/shipping";

export const pagesPropsGetter = async (params, locale) => {
    // Use locale for the API calls
    var res;
    switch (params.dashboard.join("/")) {
        case "recetas":
            res = await getRecipes("", locale);
            const filtersRes = await getRecipesFilterOptions("");

            return { recipesList: res.data, filterList: filtersRes.data, hasError: res.data.message || res.data.message || null };

        case "recetas/crear":
            res = await getRecipeFormData("", locale);

            return {
                formData: res.data,
                recipeData: null,
                hasError: res.data.message || null,
            };

        case "recetas/modificar":
            res = await getRecipeById("", params.id, locale);
            const formDataRes = await getRecipeFormData("", locale);

            return {
                formData: formDataRes.data,
                recipeData: res.data,
                hasError: res.data.message || formDataRes.data.message || null,
            };
        case "gestion-de-usuarios":
            res = await getUserList();

            return { users: res.data || [], error: res.data.message || null };

        case "gestion-de-usuarios/crear":
            res = await getRoleList();

            return { roles: res.data, error: res.data.message || null };

        case "gestion-de-usuarios/modificar":
            const userRes = await getUserById(params.id);
            const rolesRes = await getRoleList();

            return { user: userRes.data, roles: rolesRes.data, error: userRes.data.message || rolesRes.data.message || null };

        case "planes":
            res = await getPlanList(locale);

            return { plans: res.data || [], error: res.data.message || null };

        case "planes/crear":
            res = await getAdditionalPlans(locale);

            return { additionalPlans: res.data || [], error: res.data.message || null };

        case "planes/modificar":
            const additonalPlansRes = await getAdditionalPlans(locale);
            res = await getPlanById(params.id, locale);

            return { additionalPlans: additonalPlansRes.data, plan: res.data, error: res.data.message || null };

        case "gestion-de-envios":
            res = await getZonesList();

            return { zones: res.data || [], error: res.data.message || null };
        default:
            return null;
    }
};
