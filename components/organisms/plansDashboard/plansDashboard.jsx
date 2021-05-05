// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { togglePlanState, deletePlan } from "../../../helpers/serverRequests/plan";
import { useRouter } from "next/router";
const langs = require("../../../lang/components/organisms").planDashboard;

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
import SearchInputFIeld from "../../molecules/searchInputField/searchInputField";
import PlansGrid from "./plansGrid";
import SimpleModal from "../../molecules/simpleModal/simpleModal";

const PlansDashboard = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
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
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">{lang.dashboardTitle}</Typography>
                        <CreateButton onClick={() => router.push("/planes/crear")}>{lang.createButton}</CreateButton>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box marginRight={2}>
                            <FilterByDropdown
                                lang="Filtrar"
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
                <SimpleModal
                    cancelButtonText={lang.toggleStateModal.cancelButton}
                    confirmButtonText={lang.toggleStateModal.confirmButton}
                    handleCancelButton={() => setisToggleStateModalOpen(false)}
                    handleClose={() => setisToggleStateModalOpen(false)}
                    handleConfirmButton={handleToggleState}
                    open={isToggleStateModalOpen}
                    paragraphs={[lang.toggleStateModal.text]}
                    title={lang.toggleStateModal.title}
                />
            )}

            {isDeleteModalOpen && (
                <SimpleModal
                    cancelButtonText={lang.deleteModal.cancelButton}
                    confirmButtonText={lang.deleteModal.confirmButton}
                    handleCancelButton={() => setisDeleteModalOpen(false)}
                    handleClose={() => setisDeleteModalOpen(false)}
                    handleConfirmButton={handleDelete}
                    open={isDeleteModalOpen}
                    paragraphs={[lang.deleteModal.text]}
                    title={lang.deleteModal.title}
                />
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
                id: "Activo",
                label: "Activo",
                code: true,
            },
            {
                id: "Desactivo",
                label: "Desactivo",
                code: false,
            },
        ],
    },
    {
        columnLabel: "Tipo de plan",
        items: [
            {
                id: "Principal",
                label: "Principal",
                code: "Principal",
            },
            {
                id: "Adicional",
                label: "Adicional",
                code: "Adicional",
            },
        ],
    },
];
