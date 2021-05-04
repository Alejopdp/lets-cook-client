// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Paper from "../paperWithTitleContainer/paperWithTitleContainer";

//  Internal components
import FormEmpty from "../../atoms/formEmpty/formEmpty";

const FormPaperWithEmptyState = (props) => {
    return (
        <Paper fullWidth={true} title={props.title}>
            {props.empty && <FormEmpty text={props.emptyText} />}
            {props.children}
        </Paper>
    );
};

FormPaperWithEmptyState.propTypes = {
    title: PropTypes.string.isRequired,
    empty: PropTypes.bool.isRequired,
    emptyText: PropTypes.string.isRequired,
};

export default FormPaperWithEmptyState;
