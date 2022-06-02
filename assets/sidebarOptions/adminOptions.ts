import { Permission } from "helpers/types/permission";

// hola
export const getAdminOptions = (permissions: Permission[]): { icon: string; text: string; path: string }[] => {
    const options: { icon: string; text: string; path: string }[] = [];

    options.push({
        icon: "dashboard",
        text: "Dashboard",
        path: "/dashboard",
    });

    if (permissions.includes(Permission.VIEW_PAYMENT_ORDERS)) {
        options.push({
            icon: "assignment_turned_in",
            text: "Ordenes",
            path: "/ordenes",
        });
    }

    if (permissions.includes(Permission.VIEW_SUBSCRIPTION)) {
        options.push({
            icon: "cached",
            text: "Suscripciones",
            path: "/suscripciones",
        });
    }

    if (permissions.includes(Permission.VIEW_CUSTOMER)) {
        options.push({
            icon: "account_circle",
            text: "Clientes",
            path: "/gestion-de-clientes",
        });
    }

    if (permissions.includes(Permission.VIEW_PLANS)) {
        options.push({
            icon: "local_mall",
            text: "Planes",
            path: "/planes",
        });
    }

    if (permissions.includes(Permission.VIEW_RECIPES)) {
        options.push({
            icon: "restaurant",
            text: "Recetas",
            path: "/recetas",
        });
    }

    if (permissions.includes(Permission.VIEW_COUPONS)) {
        options.push({
            icon: "local_offer",
            text: "Cupones",
            path: "/cupones",
        });
    }

    if (permissions.includes(Permission.VIEW_BLOG)) {
        options.push({
            icon: "book",
            text: "Blog",
            path: "/blog",
        });
    }

    if (permissions.includes(Permission.VIEW_SHIPPING_ZONE)) {
        options.push({
            icon: "book",
            text: "Zonas de envio",
            path: "/gestion-de-envios",
        });
    }

    return options;
};
