// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import InformationItem from "../../../atoms/informationItem/informationItem";

const GeneralData = (props) => {
    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title="Datos generales" fullWidth>
                <InformationItem itemName="Código del cupón" itemValue={props.couponCode} />
                <InformationItem itemName="Tipo de descuento" itemValue={props.discount_type_label} />
                <InformationItem itemName="Requerimientos mínimos" itemValue={props.minimum_requirement_label} />
                <InformationItem itemName="Productos donde aplica" itemValue={props.apply_tp_label} />
                <InformationItem itemName="Solo un uso por cliente" itemValue={props.has_one_per_client ? "Si" : "No"} />
                <InformationItem itemName="Solo en primeros pedidos" itemValue={props.has_first_order ? "Si" : "No"} />
                <InformationItem itemName="Aplicaciones en suscripción" itemValue={props.application_by_subscription} />
            </PaperWithTitleContainer>
        </Grid>
    );
};

GeneralData.propTypes = {
    couponCode: PropTypes.string.isRequired,
    discount_type_label: PropTypes.string.isRequired,
    minimum_requirement_label: PropTypes.string.isRequired,
    apply_tp_label: PropTypes.string.isRequired,
    has_one_per_client: PropTypes.bool.isRequired,
    has_first_order: PropTypes.bool.isRequired,
    application_by_subscription: PropTypes.string.isRequired,
};

export default GeneralData;
