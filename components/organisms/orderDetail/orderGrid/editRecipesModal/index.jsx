// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../../../atoms/modal/modal'
import Typography from '@material-ui/core/Typography';

// Internal Components
import Selector from './selector'

const EditRecipesModal = (props) => {
    const theme = useTheme();


    const getTotalRecipesSelected = () => {
        return props.data.map(recipe => recipe.quantitySelected).reduce((prev, next) => prev + next, 0);
    }

    const disablePlusButton = () => {
        let total = getTotalRecipesSelected()
        if (total === props.recipesQuantity) {
            return true
        } else {
            return false
        }
    }

    const disableSubmitButton = () => {
        let total = getTotalRecipesSelected()
        if (total === props.recipesQuantity) {
            return false
        } else {
            return true
        }
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Modificar recetas'
            primaryButtonText='Modificar recetas'
            secondaryButtonText='cancelar'
            fullScreen
            disabled={disableSubmitButton()}
        >
            <Typography variant='subtitle1' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                Puedes seleccionar hasta {props.recipesQuantity} recetas
            </Typography>
            {props.data.map((recipe) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(0.5) }}>
                        {recipe.name}
                    </Typography>
                    <Selector quantity={recipe.quantitySelected} id={recipe.id} handleChange={props.handleEditRecipeQuantity} disabled={disablePlusButton()} />
                </div>
            ))}
            <Typography variant='subtitle1' color={disableSubmitButton() ? 'textSecondary' : 'primary'} style={{ fontSize: '14px', marginTop: theme.spacing(2) }}>
                Total: {getTotalRecipesSelected()} / {props.recipesQuantity}
            </Typography>
        </Modal>
    );
}

export default EditRecipesModal;