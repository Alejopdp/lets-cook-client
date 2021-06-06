import React, { useEffect, useState } from "react";
import LoginForm from "../components/loginForm";
import { verifyToken } from "../helpers/serverRequests/user";
import { useRouter } from "next/router";
import axios from "axios";
import { USER_REQUEST_SETTINGS } from "../hooks/useRequest/endpoints/user";
import useLocalStorage, { LOCAL_STORAGE_KEYS } from "../hooks/useLocalStorage/localStorage";

const Login = ({ token, lang, ...props }) => {
    const { getFromLocalStorage } = useLocalStorage();
    return (
        <div>
            <LoginForm lang={lang} isLogged={token === getFromLocalStorage(LOCAL_STORAGE_KEYS.token)} />
        </div>
    );
};

export default Login;

export async function getStaticProps({ locale, previewData }) {
    const langs = require("../lang");

    let _token = "";

    console.log("***-> Session data: ", previewData);

    // Todo: Move this 'if' to hook or helper.
    if (!!previewData) {
        const { token } = previewData;
        const _API_URL = process.env.NEXT_PUBLIC_API_URL + USER_REQUEST_SETTINGS.verifyTokenToken.endpoint;

        if (!!token) {
            _token = token;

            const res = await axios({
                method: USER_REQUEST_SETTINGS.verifyTokenToken.method,
                headers: {
                    Authorization: token,
                },
                url: _API_URL,
            });

            if(res.status !== 200) {
                _token = '';
                // Todo: Clear Server cookies
            };

            console.log("***-> Token verify: ", res.status);
        }
    } // ent to do refactor.

    return {
        props: {
            lang: langs.loginForm[locale],
            token: _token,
        },
    };
}
