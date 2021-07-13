// Utils & Config
import React, { useState } from "react";

// External components
import Container from "@material-ui/core/Container";

// Internal components
import PersonalData from "./personalData";
import AccountData from "./accountData";

const CreateCustomerForm = (props) => {
    return (
        <>
            <PersonalData />
            <AccountData />
        </>
    );
};

export default CreateCustomerForm;

CreateCustomerForm.propTypes = {

};
