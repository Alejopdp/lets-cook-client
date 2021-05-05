import React from "react";
import Navbar from "../../components/layout/navbar/navbar";
import RecoverPassword from "../../components/recoverPassword/recoverPassword";

const Recover = (props) => {
    return (
        <div>
            <RecoverPassword lang={props.lang} />
        </div>
    );
};

export default Recover;

export async function getStaticProps(context) {
    const langs = require("../../lang");
    const locale = context.locale;

    return {
        props: {
            lang: langs.recoverPassword[locale],
        },
    };
}
