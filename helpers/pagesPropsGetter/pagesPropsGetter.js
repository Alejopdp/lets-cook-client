import { getRoleList } from "../serverRequests/role";
import { getUserById, getUserList } from "../serverRequests/user";
import { getAdditionalPlans, getPlanById, getPlanList } from "../serverRequests/plan";
import { getRecipes, getRecipesFilterOptions, getRecipeFormData } from "../serverRequests/recipe";
import { getToken } from "../localStorage/localStorage";

export const pagesPropsGetter = async (params, locale) => {
    // Use locale for the API calls
    var res;
    switch (params.dashboard.join("/")) {
        case "recetas":
            res = await getRecipes("", locale);
            const filtersRes = await getRecipesFilterOptions("");

            return { recipesList: res.data, filterList: filtersRes.data, hasError: res.status !== 200 || filtersRes.status !== 200 };

        case "recetas/crear":
            res = await getRecipeFormData("", locale);

            return {
                formData: res.data,
                recipeData: null,
                hasError: res.status !== 200,
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

            return { user: userRes.data, roles: rolesRes.data, error: res.data.message || null };

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
        default:
            return null;
    }
};
