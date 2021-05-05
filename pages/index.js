import React from "react";
import LoginForm from "../components/loginForm";
import { getToken } from "../helpers/localStorage/localStorage";
import { verifyToken } from "../helpers/serverRequests/user";

const Login = (props) => {
    return (
        <div>
            <LoginForm lang={props.lang} />
        </div>
    );
};

export default Login;

export async function getStaticProps(context) {
    // const token = getToken();
    const token = "";
    const langs = require("../lang");
    const locale = context.locale;
    console.log("A ver esos langs: ", langs);

    if (!token) return { props: { lang: langs.loginForm[locale] } };

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
