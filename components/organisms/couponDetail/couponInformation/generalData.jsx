// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Box, Grid } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import InformationItem from "../../../atoms/informationItem/informationItem";

const GeneralData = (props) => {
    const getDiscountTypeLabel = (discountType) => {
        const discountLabelMap = { percent: "Porcentaje", fix: "Precio fijo", fixed: "Precio fijo", free: "Envío gratis" };

        return discountLabelMap[discountType];
    };

    const getMinimuimRequirementLabel = (minimumRequirementType) => {
        const minimumRequirementLabelMap = { none: "Ninguno", amount: "Monto mínimo de compra" };

        return minimumRequirementLabelMap[minimumRequirementType];
    };

    const getApplyToLabel = (applyToType) => {
        const applyToLabelMap = { all: "Todos los productos", specific: "Algunos productos" };

        return applyToLabelMap[applyToType];
    };

    const getCouponsBySubscriptionLabel = (type) => {
        const typeLabelMap = { only_fee: "Solo en un cargo", more_one_fee: "Mas de un cargo", all_fee: "Todos los cargos" };

        return typeLabelMap[type];
    };

    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer title="Datos generales" fullWidth>
                <InformationItem itemName="Código del cupón" itemValue={props.couponCode} />
                <InformationItem
                    itemName="Tipo de descuento"
                    itemValue={`${getDiscountTypeLabel(props.discount_type.type)} (${props.discount_type.value} ${
                        props.discount_type.type === "percent" ? "%" : "€"
                    })`}
                />
                <InformationItem
                    itemName="Requerimientos mínimos"
                    itemValue={`${getMinimuimRequirementLabel(props.minimum_requirement.type)} ${
                        props.minimum_requirement.type === "amount" ? `(${props.minimum_requirement.value} €)` : ""
                    }`}
                />
                <InformationItem itemName="Productos donde aplica" itemValue={getApplyToLabel(props.apply_to.type)} />
                <InformationItem itemName="Solo un uso por cliente" itemValue={props.has_one_per_client ? "Si" : "No"} />
                <InformationItem itemName="Solo en primeros pedidos" itemValue={props.has_first_order ? "Si" : "No"} />
                <InformationItem
                    itemName="Aplicaciones en suscripción"
                    itemValue={`${getCouponsBySubscriptionLabel(props.coupons_by_subscription.type)}${
                        props.coupons_by_subscription.type === "more_one_fee" ? `(${props.coupons_by_subscription.value} cargos)` : ""
                    }`}
                />
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
