// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { togglePlanState, deletePlan } from "../../../helpers/serverRequests/plan";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
const langs = require("../../../lang/components/organisms").planDashboard;

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

// Internal components
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";
import SearchInputFIeld from "../../molecules/searchInputField/searchInputField";
import PlansGrid from "./plansGrid";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";

const PlansDashboard = (props) => {
    const router = useRouter();
    const lang = langs[router.locale];
    const [plans, setplans] = useState([...props.plans] || []);
    const [filtersBy, setfiltersBy] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [selectedPlan, setselectedPlan] = useState({});
    const [isToggleStateModalOpen, setisToggleStateModalOpen] = useState(false);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleApplyFilters = (filters = []) => {
        setfiltersBy(filters);
    };

    const handleRemoveFilter = (itemFilterToRemove) => {
        setfiltersBy(filtersBy.filter((itemFilter) => itemFilter.id !== itemFilterToRemove.id));
    };

    const handleToggleState = async () => {
        const res = await togglePlanState(selectedPlan.id);

        if (res.status === 200) {
            setplans(plans.map((plan) => (plan.id === selectedPlan.id ? { ...selectedPlan, isActive: !selectedPlan.isActive } : plan)));
            setselectedPlan({});
            setisToggleStateModalOpen(false);
            enqueueSnackbar("Se ha cambiado el estado correctamente", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("Error al cambiar el estado", {
                variant: "error",
            });
        }
    };

    const handleDelete = async () => {
        const res = await deletePlan(selectedPlan.id);

        if (res.status === 200) {
            setplans(plans.filter((plan) => plan.id !== selectedPlan.id));
            setselectedPlan({});
            setisDeleteModalOpen(false);
            enqueueSnackbar("Se ha eliminado el plan correctamente", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("Error al eliminar el plan", {
                variant: "error",
            });
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

    // const filterPlans = (plans) => {
    //     const filteredPlans = plans.filter(plan => {
    //         if (filtersBy.some(filterItem => filterItem.label === "Activo" || filterItem.label === "Desactivo")) {

    //         }
    //     })
    // }

    const filteredPlans =
        filtersBy.length > 0
            ? filterPlansBySearchValue().filter((plan) =>
                  filtersBy.some((filterItem) => plan.type === filterItem.code || plan.isActive === filterItem.code)
              )
            : filterPlansBySearchValue();

    return (
        <>
            <CreateDashboardTitle
                createButtonText={lang.createButton}
                dashboardTitle={lang.dashboardTitle}
                handleCreateButton={() => router.push("/planes/crear")}
            />

            <Grid item xs={12}>
                <Box display="flex" alignItems="center" marginY={2}>
                    <Box marginRight={2}>
                        <FilterByDropdown
                            lang="Filtrar"
                            options={filterOptions}
                            optionsSelected={filtersBy}
                            handlerOnConfirm={handleApplyFilters}
                        />
                    </Box>
                    <SearchInputFIeld handlerOnChange={setsearchValue} placeholder="Buscar por nombre o SKU..." />
                </Box>
            </Grid>

            {filtersBy.length > 0 && (
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        {filtersBy.map((itemFilter, index) => (
                            <Chip
                                key={index}
                                label={itemFilter.label}
                                onDelete={() => handleRemoveFilter(itemFilter)}
                                color="primary"
                                style={{ marginRight: 8 }}
                            />
                        ))}
                    </Box>
                </Grid>
            )}

            {filteredPlans.length > 0 ? (
                <PlansGrid plans={filteredPlans} handleToggleState={handleOpenToggleStateModal} handleDelete={handleOpenDeleteModal} />
            ) : (
                <EmptyImage
                    label={
                        filtersBy.length > 0 || !!searchValue
                            ? "No se han encontrado planes que coincidan con los términos de búsqueda"
                            : "Aún no se crearon planes"
                    }
                />
            )}

            {isToggleStateModalOpen && (
                <SimpleModal
                    acancelButtonText={lang.toggleStateModal.cancelButton}
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
        </>
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
