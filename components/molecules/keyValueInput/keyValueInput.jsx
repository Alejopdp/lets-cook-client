// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import FreeSoloAutocomplete from "../../atoms/freeSoloAutocomplete/freeSoloAutocomplete";
import FormInput from "../../atoms/input/input";
import IconButton from "@material-ui/core/IconButton";
import MultipleChipInput from "../../atoms/multipleChipInput/multipleChipInput";

// Image & Icons
import Delete from "@material-ui/icons/Delete";

const KeyValueInput = (props) => {
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" minHeight={80}>
                <Typography variant="subtitle2">{props.title}</Typography>
                {props.isDeletable && (
                    <IconButton style={{ marginRight: -16 }} onClick={props.handleRemoveAttribute}>
                        <Delete style={{ cursor: "pointer" }} />
                    </IconButton>
                )}
            </Box>
            <Box display="flex" alignItems="center">
                <Box minWidth="40%" marginRight={2} alignSelf="flex-start">
                    <FreeSoloAutocomplete
                        options={[]}
                        label=""
                        value={props.keyValue}
                        handleChange={(e) => props.handleKeyChange(props.index, e)}
                        disabled={!props.isKeyEditable}
                    />
                </Box>
                <MultipleChipInput
                    freeSolo={true}
                    disableClearable={true}
                    options={[]}
                    values={props.values}
                    onChange={(e) => props.handleValuesChange(props.index, e)}
                    handleRemoveValue={(value) => props.handleRemoveAttributeValue(props.index, value)}
                />
            </Box>
        </Box>
    );
};

KeyValueInput.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    keyValue: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    handleKeyChange: PropTypes.string.isRequired,
    handleValuesChange: PropTypes.func.isRequired,
    handleRemoveAttributeValue: PropTypes.func.isRequired,
    handleRemoveAttribute: PropTypes.func.isRequired,
    isKeyEditable: PropTypes.bool,
    isDeletable: PropTypes.bool,
};

export default KeyValueInput;
