import LoginForm from "../components/loginForm";
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

// export async function getServerSideProps({locale})

// export async function getStaticProps({ locale, previewData }) {
//     const langs = require("../lang");
//     let _token = await authToken(previewData);

//     const redirect = !!_token ? {
//         redirect: {
//             destination: "/dashboard",
//             permanent: true,
//         }
//     } : {}

//     return {
//         ...redirect,
//         props: {
//             lang: langs.loginForm[locale],
//             token: _token,
//         },
//     };
// }
