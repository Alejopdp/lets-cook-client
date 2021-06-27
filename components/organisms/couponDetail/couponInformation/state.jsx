// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import InformationItem from "../../../atoms/informationItem/informationItem";

const GeneralData = (props) => {
    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title="Estado" fullWidth>
                <Chip title={props.state} />
            </PaperWithTitleContainer>
        </Grid>
    );
};

GeneralData.propTypes = {
    state: PropTypes.string.isRequired,
};

export default GeneralData;
