import React from "react";
import LoginForm from "../components/loginForm";
import { getToken } from "../helpers/localStorage/localStorage";
import { verifyToken } from "../helpers/serverRequests/user";

const Login = (props) => {
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Login;

export async function getInitialProps(context) {
    const token = getToken();
    if (!token) return { props: {} };

    const res = await verifyToken(token);
    const isTokenValid = res.status === 200;

    if (!isTokenValid) {
        clearLocalStorage();
        return { props: {} };
    }

    return {
        redirect: {
            permanent: false,
            destination: "/dashboard",
        },
    };
}
