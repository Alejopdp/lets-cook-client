// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';


const DeactivateCouponModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Desactivar cupón'
            primaryButtonText='Desactivar cupón'
            primaryButtonColor={theme.palette.secondary.main}
            secondaryButtonText='cancelar'
        >
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px' }}>
                ¿Estás seguro de que quieres desactivar este cupón? El mismo seguirá siendo aplicado en usuarios existentes, pero nuevos usuarios no podrán utilizarlo. Lo podrás reactivar luego.
            </Typography>
        </Modal>
    );
}

export default DeactivateCouponModal;