// Utils & Config
import React from 'react'

// External components
import Container from '@material-ui/core/Container'

// Internal components
import DashboardWithButton from '../../layout/dashboardTitleWithButton/dashboardTitleWithButton'
import ShippingTable from './shippingTable'

const ShippingDashboard = () => {
    return (
        <Container size="md">
            <DashboardWithButton
                title="Zonas de envío"
                buttonText="Crear zona de envío"
                startIcon
            />

            <ShippingTable />
        </Container>
    )
}

export default ShippingDashboard;
