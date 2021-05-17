import React, { useEffect } from "react";
import LoginForm from "../components/loginForm";
import { getToken, clearLocalStorage } from "../helpers/localStorage/localStorage";
import { verifyToken } from "../helpers/serverRequests/user";
import { useRouter } from "next/router";

const Login = (props) => {
    const router = useRouter();

    useEffect(() => {
        const verifyTheToken = async () => {
            const token = getToken();

            if (!token) return;
            const res = await verifyToken(token);

            if (res.status === 200) {
                router.replace("/dashboard", "/dashboard");
            } else {
                clearLocalStorage();
            }
            return;
        };

        verifyTheToken();
    }, []);
    return (
        <div>
            <LoginForm lang={props.lang} />
        </div>
    );
};

export default Login;

export async function getStaticProps(context) {
    const langs = require("../lang");
    const locale = context.locale;

    return { props: { lang: langs.loginForm[locale] } };
}
