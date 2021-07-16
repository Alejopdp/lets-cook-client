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
