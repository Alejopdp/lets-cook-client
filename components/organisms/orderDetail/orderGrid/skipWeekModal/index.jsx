// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';


const SkipWeekModal = (props) => {
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Saltar semana'
            primaryButtonText='saltar semana'
            primaryButtonColor={theme.palette.secondary.main}
            secondaryButtonText='cancelar'
        >
            <Typography variant='body1' color='textSecondary' style={{ fontSize: '16px' }}>
                ¿Estás seguro de que deseas saltar la semana?
            </Typography>
        </Modal>
    );
}

export default SkipWeekModal;