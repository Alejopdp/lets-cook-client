import PropTypes from 'prop-types';

import { Box, Container, Grid, Typography } from "@material-ui/core";

import DasboardWithBackTitle from '../../layout/dashboardTitleWithBackButton';
import { useStyles } from "./styles";
import PaperWithTitleContainer from '../../molecules/paperWithTitleContainer/paperWithTitleContainer';
import CreateButton from '../../atoms/createButton/createButton';
import Autocomplete from '../../atoms/autocomplete/autocomplete';
import Input from '../../atoms/input/input';
import BackAndCreateButtons from '../../molecules/backAndCreateButtons/backAndCreateButtons';
import { useRef } from 'react';
import SimpleSelect from '../../atoms/simpleSelect/SimpleSelect';

const CouponsForm = ({ lang = {}, ...props }) => {

    const discountType = [
        "Precio fijo",
        "Porcentaje",
        "Envío gratis"
    ]

    const classes = useStyles();
    const formRef = useRef(null);

    const _handleGoBack = () => {

    }

    const _handleChangeLanguage = () => {

    }
    const _handleClickCreateButton = () => {
        // TODO: Put here all code for get form values.
        const discountCode = formRef.current.discountCode.value;
    }

    return (
        <Container maxWidth="lg" style={{ margin: "auto" }}>
            <form ref={formRef}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <DasboardWithBackTitle title={lang.title || "Cupones"} handleClick={_handleGoBack} />
                        </Box>
                    </Grid>
                    <PaperWithTitleContainer fullWidth={true} title="Código de decuento">
                        <Grid container spacing={2}>
                            <Input
                                label="Código de descuento"
                                name="discountCode"
                            />
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 16 }} />
                    <PaperWithTitleContainer fullWidth={true} title="Tipo de descuento">
                        <Grid item container  spacing={2}>
                            <Grid item xs={6}>
                                <SimpleSelect
                                    name="discountType"
                                    items={discountType}
                                    value={discountType[0]}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Input
                                    label="valor"
                                    name="discountValue"
                                />
                            </Grid>
                            <Grid item xs>
                                <Typography>€</Typography>
                            </Grid>
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 16 }} />
                    <PaperWithTitleContainer fullWidth={true} title="Requerimientos mínimos">
                        <Grid container spacing={2}>
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 16 }} />

                    <PaperWithTitleContainer fullWidth={true} title="Aplica a">
                        <Grid container spacing={2}>
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 16 }} />

                    <PaperWithTitleContainer fullWidth={true} title="Limite de aplicación">
                        <Grid container spacing={2}>
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 16 }} />
                    <PaperWithTitleContainer fullWidth={true} title="Rango de fechas">
                        <Grid container spacing={2}>
                        </Grid>
                    </PaperWithTitleContainer>
                    <div style={{ width: "100%", height: 64 }} />
                    <Grid container spacing={2}>
                        <Grid item xs={12} alignItems="flex-end">
                            <BackAndCreateButtons createButtonHandler={_handleClickCreateButton} createButtonText="Crear Cupón" variant="outline" />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

CouponsForm.propTypes = {

}

CouponsForm.defaultValues = {

}

export default CouponsForm;