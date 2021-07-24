// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";

// Internal components
import GeneralData from "./generalData";
import DateRange from "./dateRange";
import State from "./state";
import Application from "./applications";
import CouponActions from "./couponActions";
import DeactivateCouponModal from './deactivateCouponModal';
import DeleteCouponModal from './deleteCouponModal';

const CouponInformation = (props) => {
    const [openDeactiveCouponModal, setOpenDeactiveCouponModal] = useState(false);
    const [openDeleteCouponModal, setOpenDeleteCouponModal] = useState(false);


    // const handleClickDeactivateCoupon = () => {
    //     alert('desactive')
    // }

    // const handleClickDeleteCoupon = () => {
    //     alert('delete')
    // }


    // Deactive Coupon Modal Functions

    const handleClickOpenDeactiveCouponModal = () => {
        setOpenDeactiveCouponModal(true);
    };

    const handleCloseDeactiveCouponModal = () => {
        setOpenDeactiveCouponModal(false);
    };

    const handleDeactiveCoupon = () => {
        alert('deactive')
        setOpenDeactiveCouponModal(false);
    }


    // Delete Coupon Modal Functions

    const handleClickOpenDeleteCouponModal = () => {
        setOpenDeleteCouponModal(true);
    };

    const handleCloseDeleteCouponModal = () => {
        setOpenDeleteCouponModal(false);
    };

    const handleDeleteCoupon = () => {
        alert('deleted')
        setOpenDeleteCouponModal(false);
    }

    return (
        <>
            <Grid item xs={12} md={8}>
                <Grid container item spacing={2}>
                    <GeneralData
                        application_by_subscription={props.coupon.application_by_subscription}
                        apply_tp_label={props.coupon.apply_tp_label}
                        couponCode={props.coupon.code}
                        discount_type_label={props.coupon.discount_type_label}
                        has_first_order={props.coupon.has_first_order}
                        has_one_per_client={props.coupon.has_one_per_client}
                        minimum_requirement_label={props.coupon.minimum_requirement_label}
                    />
                    <DateRange startDate={props.coupon.date_rage.start} expireData={props.coupon.date_rage.expire} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container item spacing={2}>
                    <State state={props.coupon.state} />
                    <Application />
                    <CouponActions handleClickDeactivateCoupon={handleClickOpenDeactiveCouponModal} handleClickDeleteCoupon={handleClickOpenDeleteCouponModal} />
                </Grid>
            </Grid>
            <DeactivateCouponModal
                open={openDeactiveCouponModal}
                handleClose={handleCloseDeactiveCouponModal}
                handlePrimaryButtonClick={handleDeactiveCoupon}
            />
            <DeleteCouponModal
                open={openDeleteCouponModal}
                handleClose={handleCloseDeleteCouponModal}
                handlePrimaryButtonClick={handleDeleteCoupon}
            />
        </>
    );
};

CouponInformation.propTypes = {};

export default CouponInformation;
