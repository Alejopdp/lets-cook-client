// Utils & Config
import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components
import { Box, Grid, Typography, Container } from '@material-ui/core';

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import PaperWithTitleContainer from '../../molecules/paperWithTitleContainer/paperWithTitleContainer';
import Input from '../../atoms/input/input';
import RoundedCheckbox from '../../atoms/roundedCheckbox/roundedCheckbox';
import BackAndCreateButtons from '../../molecules/backAndCreateButtons/backAndCreateButtons';

const ShippingZoneForm = () => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <Container size="lg">
            <DashboardWithBackTitle title="Crear zona de envío" />

            <Grid item container spacing={2} justify="center" direction="column">
                <Grid item>
                    <PaperWithTitleContainer title="Detalles" width={600}>
                        <Input label="Nombre" value="" />
                        <Input label="Referencia" value="" />
                    </PaperWithTitleContainer>
                </Grid>

                <Grid item>
                    <PaperWithTitleContainer title="Coste de envío" width={600}>
                        <RoundedCheckbox
                            value={""}
                            name="Free"
                            label="Gratis"
                        />

                        <br />

                        <RoundedCheckbox
                            value={""}
                            name="Pay"
                            label="Pago"
                        />

                        <Grid item container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <Input label="Valor" value=""/>
                            </Grid>
                            <Grid item>
                                <Typography variant="body1" style={{marginBottom: theme.spacing(2)}}>€</Typography>
                            </Grid>
                        </Grid>
                    </PaperWithTitleContainer>
                </Grid>

                <Grid item>
                    <PaperWithTitleContainer title="Subir archivo KML" width={600}>
                        <Typography variant="body1">
                            Puedes utilizar la siguiente herramienta para crear las zonas de envío:
                        </Typography>

                        <Typography variant="subtitle2">
                            <a href="https://mapsengine.google.com/map/" target="blank">
                                https://mapsengine.google.com/map/
                            </a>
                        </Typography>
                    </PaperWithTitleContainer>
                </Grid>
            </Grid>

            <Box width={600} display="flex" justifyContent="flex-end" margin="0 auto" >
                <BackAndCreateButtons
                    backButtonHandler={() => (router.back())}
                    createButtonHandler={() => (router.push("/gestion-de-envios"))}
                    createButtonText={"Crear zona de envío"}
                />
            </Box>
        </Container>
    )
}

export default ShippingZoneForm;
