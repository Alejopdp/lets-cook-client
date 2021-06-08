export const USER_REQUEST_SETTINGS = {
    login: {
        endpoint: "/user/login",
        method: "POST",
        needAuth: false,
    },
    forgetPassword: {
        endpoint: "/user/forgot-password",
        method: "PUT",
        needAuth: true,
    },
    verifyTokenToken: {
        endpoint: "/user/verify-token",
        method: "GET",
        needAuth: true,
    },
    generatePassword: {
        endpoint: "/user/generate-password",
        method: "GET",
        needAuth: true,
    },
    getAllUsers: {
        endpoint: "/user",
        method: "GET",
        needAuth: true,
    },
    getUserById: {
        endpoint: "/user",
        method: "GET",
        needAuth: true,
    },
    createUsers: {
        endpoint: "/user",
        method: "POST",
        needAuth: true,
    },
    updateUser: {
        endpoint: "/user",
        method: "PUT",
        needAuth: true,
    },
    deleteUser: {
        endpoint: "/user",
        method: "DELETE",
        needAuth: true,
    },
};