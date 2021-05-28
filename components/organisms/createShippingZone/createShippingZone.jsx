// Utils & Config
import React from 'react'

// External components
import { Container } from '@material-ui/core'

// Internal components
import DashboardWithBackTitle from "../../../components/layout/dashboardTitleWithBackButton";
import ShippingZoneForm from '../shippingZoneForm'

const CreateShippingZone = () => {
    return (
        <Container>
            <DashboardWithBackTitle title="Crear zona de envío" />

            <ShippingZoneForm />
        </Container>
    )
}

export default CreateShippingZone
