// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

// External components

// Internal components
import DashboardTitle from "../../layout/dashboardTitleWithBackButton/";
import CouponInformation from "./couponInformation";

const CouponDetail = (props) => {
    const router = useRouter();

    return (
        <>
            <DashboardTitle title="Detalle del cupón" />
            <CouponInformation coupon={props.coupon} />
        </>
    );
};

CouponDetail.propTypes = {};

export default CouponDetail;
