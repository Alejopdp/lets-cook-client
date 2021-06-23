// Utils & Config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";

// Internal components
import PaperWithTitleContainer from "../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import Input from "../../atoms/input/input";
import DatePicker from "../../atoms/datePicker/datePicker";
import SelectInput from "../../atoms/selectInput/SelectInput";

const PersonalData = (props) => {
    return (
        <PaperWithTitleContainer width="70%" title="Datos personales">
            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="name"
                        label="Nombre"
                        value={props.name}
                        onChange={props.onChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="lastName"
                        label="Apellido/s"
                        value={props.lastName}
                        onChange={props.onChange}
                    />
                </Box>
            </Box>

            <Box display="flex" flexDirection="row">
                <Box width="50%" marginRight="8px">
                    <Input
                        name="phone1"
                        label="Teléfono (1)"
                        value={props.phone1}
                        onChange={props.onChange}
                    />
                </Box>
                <Box width="50%" marginLeft="8px">
                    <Input
                        name="phone2"
                        label="Teléfono (2)"
                        value={props.phone2}
                        onChange={props.onChange}
                    />
                </Box>
            </Box>

            <DatePicker />

            <SelectInput />
        </PaperWithTitleContainer>
    );
};

export default PersonalData;

PersonalData.propTypes = {

};
