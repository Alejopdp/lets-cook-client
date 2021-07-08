// Utils & Config
import React, { useState } from "react";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import PersonalData from "./personalData";
import AccountData from "./accountData";

const CreateClientForm = (props) => {
    return (
        <>
            <PersonalData />
            <AccountData />
        </>
    );
};

export default CreateClientForm;

CreateClientForm.propTypes = {

};
