// Utils & config
import React, { useEffect } from "react";
import { getDataForGeneratingNewPassword, verifyToken } from "../../helpers/serverRequests/user";

// Internal components
import NewPassword from "../../components/recoverPassword/newPassword";

const Recover = (props) => {
    return (
        <div>
            <NewPassword isTokenValid={props.isTokenValid} token={props.token} email={props.email} lang={props.lang} />
        </div>
    );
};

export default Recover;

export async function getServerSideProps(context) {
    const langs = require("../../lang");
    const locale = context.locale;
    if (context.query.token) {
        const res = await getDataForGeneratingNewPassword(context.query.token);

        return {
            props: {
                isTokenValid: !!res && res.status === 200,
                email: res && res.data.email ? res.data.email : null,
                token: res ? context.query.token : null,
                lang: langs.newPassword[locale],
            },
        };
    } else {
        return {
            props: {
                isTokenValid: false,
                email: null,
                token: null,
            },
        };
    }
}
