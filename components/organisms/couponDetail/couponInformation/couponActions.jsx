// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid, Button } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import { useTheme } from "@material-ui/styles";
import { CouponState } from "types/coupon/couponState";

const CouponActions = (props) => {
    const theme = useTheme();

    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                {props.state === CouponState.INACTIVE && (
                    <div>
                        <Button size="medium" style={{ color: theme.palette.primary.main }} onClick={props.handleClickActivateCoupon}>
                            Activar cupón
                        </Button>
                    </div>
                )}
                {props.state === CouponState.ACTIVE && (
                    <div>
                        <Button size="medium" style={{ color: theme.palette.secondary.main }} onClick={props.handleClickDeactivateCoupon}>
                            Desactivar cupón
                        </Button>
                    </div>
                )}
                {props.state !== CouponState.DELETED && (
                    <div>
                        <Button size="medium" style={{ color: "#FC1919" }} onClick={props.handleClickDeleteCoupon}>
                            Eliminar cupón
                        </Button>
                    </div>
                )}
            </PaperWithTitleContainer>
        </Grid>
    );
};

CouponActions.propTypes = {};

export default CouponActions;
