// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { togglePlanState, deletePlan } from "../../../helpers/serverRequests/plan";
import { useRouter } from "next/router";

// External components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

// Internal components
import CreateButton from "../../atoms/createButton/createButton";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";
import SearchInputFIeld from "../../atoms/searchInputField/searchInputField";
import PlansGrid from "./plansGrid";

const PlansDashboard = (props) => {
    const router = useRouter();
    const [plans, setplans] = useState([...props.plans] || []);
    const [filtersBy, setfiltersBy] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [selectedPlan, setselectedPlan] = useState({});
    const [isToggleStateModalOpen, setisToggleStateModalOpen] = useState(false);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);

    const handleApplyFilters = (filters = []) => {
        setfiltersBy(filters);
    };

    const handleToggleState = async () => {
        const res = await togglePlanState(selectedPlan.id);

        if (res.status === 200) {
            setplans(plans.map((plan) => (plan.id === selectedPlan.id ? { ...selectedPlan, isActive: !selectedPlan.isActive } : plan)));
            setselectedPlan({});
            setisToggleStateModalOpen(false);
        } else {
            alert("Error");
        }
    };

    const handleDelete = async () => {
        const res = await deletePlan(selectedPlan.id);

        if (res.status === 200) {
            setplans(plans.filter((plan) => plan.id !== selectedPlan.id));
            setselectedPlan({});
            setisDeleteModalOpen(false);
        } else {
            alert("Error");
        }
    };

    const handleOpenToggleStateModal = (plan) => {
        setselectedPlan(plan);
        setisToggleStateModalOpen(true);
    };

    const handleOpenDeleteModal = (plan) => {
        setselectedPlan(plan);
        setisDeleteModalOpen(true);
    };

    const filterPlansBySearchValue = () => {
        return plans.filter(
            (plan) =>
                plan.name.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ||
                plan.sku.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
        );
    };

    const filteredPlans =
        filtersBy.length > 0
            ? filterPlansBySearchValue().filter((plan) =>
                  filtersBy.some((filterItem) => plan.type === filterItem.code || plan.isActive === filterItem.code)
              )
            : filterPlansBySearchValue();

    return (
        <Container maxWidth="md">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Planes</Typography>
                        <CreateButton onClick={() => router.push("/planes/crear")}>CREAR PLAN</CreateButton>
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
                <PlansGrid plans={filteredPlans} handleToggleState={handleOpenToggleStateModal} handleDelete={handleOpenDeleteModal} />
            </Grid>

            {isToggleStateModalOpen && (
                <Dialog
                    open={isToggleStateModalOpen}
                    onClose={() => setisToggleStateModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Cambiar estado</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ¿Estás seguro que quieres cambiar el estado de este plan?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToggleState} color="primary">
                            CAMBIAR ESTADO
                        </Button>
                        <Button onClick={() => setisToggleStateModalOpen(false)} color="primary" autoFocus>
                            CANCELAR
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {isDeleteModalOpen && (
                <Dialog
                    open={isDeleteModalOpen}
                    onClose={() => setisDeleteModalOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Eliminar</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">¿Estás seguro que quieres eliminar este plan?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete} color="primary">
                            ELIMINAR
                        </Button>
                        <Button onClick={() => setisDeleteModalOpen(false)} color="primary" autoFocus>
                            CANCELAR
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
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
