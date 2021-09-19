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
import DeactivateCouponModal from "./deactivateCouponModal";
import DeleteCouponModal from "./deleteCouponModal";
import { CouponState } from "types/coupon/couponState";
import { useSnackbar } from "notistack";
import { updateCouponState } from "helpers/serverRequests/coupon";

const CouponInformation = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [openDeactiveCouponModal, setOpenDeactiveCouponModal] = useState(false);
    const [openDeleteCouponModal, setOpenDeleteCouponModal] = useState(false);
    const [coupon, setCoupon] = useState({ ...props.coupon });

    // Deactive Coupon Modal Functions

    const handleClickOpenDeactiveCouponModal = () => {
        setOpenDeactiveCouponModal(true);
    };

    const handleCloseDeactiveCouponModal = () => {
        setOpenDeactiveCouponModal(false);
    };

    const handleDeactiveCoupon = async () => {
        const res = await updateCouponState(CouponState.INACTIVE, props.coupon.id);

        if (res.status === 200) {
            enqueueSnackbar("Cupón desactivado correctamente", { variant: "success" });
            setCoupon({ ...coupon, state: CouponState.INACTIVE });
            setOpenDeactiveCouponModal(false);
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    // Delete Coupon Modal Functions

    const handleClickOpenDeleteCouponModal = () => {
        setOpenDeleteCouponModal(true);
    };

    const handleCloseDeleteCouponModal = () => {
        setOpenDeleteCouponModal(false);
    };

    const handleDeleteCoupon = () => {
        alert("deleted");
        setOpenDeleteCouponModal(false);
    };

    return (
        <>
            <Grid item xs={12} md={8}>
                <Grid container item spacing={2}>
                    <GeneralData
                        application_by_subscription={props.coupon.application_by_subscription}
                        apply_to={props.coupon.apply_to}
                        couponCode={props.coupon.code}
                        discount_type={props.coupon.discount_type}
                        has_first_order={props.coupon.has_first_order}
                        has_one_per_client={props.coupon.has_one_per_client}
                        minimum_requirement={props.coupon.minimum_requirement}
                        coupons_by_subscription={props.coupon.coupons_by_subscription}
                    />
                    <DateRange startDate={props.coupon.date_rage.start} expireDate={props.coupon.date_rage.expire} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
                <Grid container item spacing={2}>
                    <State state={coupon.state} />
                    <Application
                        limites={props.coupon.limites}
                        quantityApplied={props.coupon.quantityApplied}
                        quantityOfCustomersWhoHaveApplied={props.coupon.quantityOfCustomersWhoHaveApplied}
                    />
                    <CouponActions
                        state={coupon.state}
                        handleClickDeactivateCoupon={handleClickOpenDeactiveCouponModal}
                        handleClickDeleteCoupon={handleClickOpenDeleteCouponModal}
                    />
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
