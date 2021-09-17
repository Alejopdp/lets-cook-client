// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import InformationItem from "../../../atoms/informationItem/informationItem";

const DateRange = (props) => {
    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title="Rango de fechas" fullWidth>
                <InformationItem itemName="Fecha de inicio" itemValue={props.startDate} />
                <InformationItem itemName="Fecha de expiración" itemValue={props.endDate || "Este cupón no tiene fecha de expiración"} />
            </PaperWithTitleContainer>
        </Grid>
    );
};

DateRange.propTypes = {
    startDate: PropTypes.string.isRequired,
    expireData: PropTypes.string.isRequired,
};

export default DateRange;
