import "../styles/globals.scss";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import { isAuthenticated } from "../helpers/auth/auth";
import { useRouter } from "next/router";

export default function MyApp(props) {
    const { Component, pageProps } = props;
    const router = useRouter();

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        const isUserAuthenticated = async () => {
            const hasAuth = await isAuthenticated();

            // if (!hasAuth) router.push("/");
        };

        isUserAuthenticated();
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Let's Cook</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </React.Fragment>
    );
}
