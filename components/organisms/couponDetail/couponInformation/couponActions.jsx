// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import { Grid, Button } from "@material-ui/core";

// Internal components
import PaperWithTitleContainer from "../../../molecules/paperWithTitleContainer/paperWithTitleContainer";
import { useTheme } from "@material-ui/styles";

const CouponActions = (props) => {
    const theme = useTheme();

    return (
        <Grid item xs={12}>
            <PaperWithTitleContainer fullWidth={true} title="Acciones generales">
                <div>
                    <Button size="medium" style={{ color: theme.palette.secondary.main }} onClick={props.handleClickDeactivateCoupon}>
                        Desactivar cupón
                </Button>
                </div>
                <div>
                    <Button size="medium" style={{ color: '#FC1919' }} onClick={props.handleClickDeleteCoupon}>
                        Eliminar cupón
                </Button>
                </div>
            </PaperWithTitleContainer>
        </Grid>
    );
};

CouponActions.propTypes = {};

export default CouponActions;