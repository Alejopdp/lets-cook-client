import { getRoleList } from "../serverRequests/role";
import { getUserById, getUserList } from "../serverRequests/user";
import { getPlanList } from "../serverRequests/plan";

export const pagesPropsGetter = async (params, locale) => {
    // Use locale for the API calls
    var res;
    switch (params.dashboard.join("/")) {
        case "recetas":
            // TO DO
            return {};

        case "gestion-de-usuarios":
            res = await getUserList();

            return { users: res.data || [] };

        case "gestion-de-usuarios/crear":
            res = await getRoleList();

            return res.data ? { roles: res.data } : null;

        case "gestion-de-usuarios/modificar":
            const userRes = await getUserById(params.id);
            const rolesRes = await getRoleList();

            return { user: userRes.data, roles: rolesRes.data };

        case "planes":
            res = await getPlanList();

            return { plans: res.data || [] };

        case "planes/crear":
            return {};
        default:
            return null;
    }
};
