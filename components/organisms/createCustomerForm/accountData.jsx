// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";

const AccountData = (props) => {
    return (
        <PaperWithTitleContainer width="70%" title="Datos de la cuenta">
            <Input
                name="email"
                label="Correo electrónico"
                value={props.formData.email}
                handleChange={props.handleChange}
            />
            <Input
                name="password"
                label="Contraseña"
                value={props.formData.password}
                handleChange={props.handleChange}
            />
        </PaperWithTitleContainer>
    );
};

export default AccountData;

AccountData.propTypes = {

};
