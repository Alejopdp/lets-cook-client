// Utils & Config
import React from 'react';
import { useTheme } from "@material-ui/core/styles";
import { useRouter } from "next/router";

// External components
import { Box, Button, Grid, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import PaperWithTitleContainer from '../../molecules/paperWithTitleContainer/paperWithTitleContainer';
import Input from '../../atoms/input/input';
import CustomButton from '../../atoms/button/button';

// Icons & Images
import AddIcon from "@material-ui/icons/Add";

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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    color="primary"
                                />
                            }
                            label="Gratis"
                        />

                        <br />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    icon={<CircleUnchecked />}
                                    checkedIcon={<CircleCheckedFilled />}
                                    color="primary"
                                />
                            }
                            label="Pago"
                        />
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

            <Box width={600} display="flex" justifyContent="flex-end" margin="0 auto" marginTop={theme.spacing(1)}>
                <Button onClick={() => (router.back())}>
                    Volver
                </Button>

                <CustomButton onClick={() => (router.push("/gestion-de-envios"))} startIcon={<AddIcon />}>
                    Crear zona de envío
                </CustomButton>
            </Box>
        </Container>
    )
}

export default ShippingZoneForm;
