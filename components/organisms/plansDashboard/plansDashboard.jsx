// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";
import SearchInputFIeld from "../../atoms/searchInputField/searchInputField";
import PlansGrid from "./plansGrid";

const filterOptions = [
    {
        columnLabel: "Estado",
        items: [
            {
                label: "Activo",
                code: true,
            },
            {
                label: "Desactivo",
                code: false,
            },
        ],
    },
    {
        columnLabel: "Tipo de plan",
        items: [
            {
                label: "Principal",
                code: "Principal",
            },
            {
                label: "Adicional",
                code: "Adicional",
            },
        ],
    },
];

const PlansDashboard = (props) => {
    const [filtersBy, setfiltersBy] = useState([]);
    const [searchValue, setsearchValue] = useState("");

    const handleApplyFilters = (filters = []) => {
        setfiltersBy(filters);
    };

    const plans = searchValue
        ? props.plans.filter(
              (plan) =>
                  plan.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
                  plan.sku.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
          )
        : props.plans;

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Planes</Typography>
                        <CreateButton>CREAR PLAN</CreateButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box marginRight={2}>
                            <FilterByDropdown
                                lang="Filtrar"
                                handlerOnConfirm={() => ""}
                                options={filterOptions}
                                optionsSelected={filtersBy}
                                handlerOnConfirm={handleApplyFilters}
                            />
                        </Box>
                        <SearchInputFIeld handlerOnChange={setsearchValue} />
                    </Box>
                </Grid>
                <PlansGrid plans={plans} />
            </Grid>
        </Container>
    );
};

PlansDashboard.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            shortDescription: PropTypes.string.isRequired,
            isActive: PropTypes.bool.isRequired,
            sku: PropTypes.string.isRequired,
            planType: PropTypes.string.isRequired,
        })
    ),
};

export default PlansDashboard;
