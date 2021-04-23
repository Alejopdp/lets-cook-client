// Utils & config
import React, { useEffect } from "react";
import { getDataForGeneratingNewPassword, verifyToken } from "../../helpers/serverRequests/user";

// Internal components
import NewPassword from "../../components/recoverPassword/newPassword";

const Recover = (props) => {
    useEffect(() => {
        if (!props.isTokenValid) {
            alert("Token invalido");
        }
    }, []);

    return (
        <div>
            <NewPassword token={props.token} email={props.email} />
        </div>
    );
};

export default Recover;

export async function getServerSideProps(context) {
    console.log(context.query);
    const res = await getDataForGeneratingNewPassword(context.query.token);

    return {
        props: {
            isTokenValid: res.status === 200,
            email: res.data.email,
            token: context.query.token,
        },
    };
}
