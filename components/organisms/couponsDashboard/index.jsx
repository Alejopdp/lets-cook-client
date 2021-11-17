// Utils & config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

// Internal components
import DashboardTitleWithButtonAndCSV from "../../layout/dashboardTitleWithButtonAndCSV/dashboardTitleWithButtonAndCSV";
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import CuoponsTable from "./couponsTable/couponsTable";
import EmptyImage from "../../molecules/emptyImage/emptyImage";
import { exportCoupons, importManyCoupons } from "helpers/serverRequests/coupon";

const CouponsDashboard = (props) => {
    const router = useRouter();
    const [coupons, setcoupons] = useState([...props.coupons] || []);
    const [filtersBy, setfiltersBy] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [importFile, setImportFile] = useState("");
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleApplyFilters = (filters = []) => {
        setfiltersBy(filters);
    };

    const handleRemoveFilter = (itemFilterToRemove) => {
        setfiltersBy(filtersBy.filter((itemFilter) => itemFilter.id !== itemFilterToRemove.id));
    };

    const filterCouponsBySearchValue = () => {
        return coupons.filter((coupon) => coupon.code.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
    };

    const filteredCoupons =
        filtersBy.length > 0
            ? filterCouponsBySearchValue().filter((coupon) =>
                  filtersBy.some((filterItem) => coupon.type === filterItem.code || coupon.isActive === filterItem.code)
              )
            : filterCouponsBySearchValue();

    const handleClickImport = async (e) => {
        const data = new FormData();

        data.append("coupons", e.target.files[0]);
        const res = await importManyCoupons(data);

        if (res && res.status === 200) {
            setcoupons([...res.data, ...coupons]);
            enqueueSnackbar("Todos los cupones fueron cargados correctamente", { variant: "success" });
        } else {
            enqueueSnackbar(res && res.data ? res.data.message : "Ocurrió un error inesperado", { variant: "error" });
        }
        setImportFile("");
    };
    const handleClickExport = async () => {
        const res = await exportCoupons();

        if (!!!res || res.status !== 200) {
            enqueueSnackbar(!!!res ? "Ha ocurrido un error inesperado" : res.data.message, { variant: "error" });
        }
    };

    return (
        <>
            <DashboardTitleWithButtonAndCSV
                title="Cupones"
                import
                export
                importFile={importFile}
                handleClickImport={handleClickImport}
                handleClickExport={handleClickExport}
                handleClick={() => router.push("/cupones/crear")}
                buttonText="CREAR CUPÓN"
                multipleImportFiles={false}
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
                    <SearchInputField handlerOnChange={setsearchValue} placeholder="Buscar por código de cupón..." />
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

            {filteredCoupons.length > 0 ? (
                <CuoponsTable coupons={filteredCoupons} />
            ) : (
                <EmptyImage
                    label={
                        filtersBy.length > 0 || !!searchValue
                            ? "No se han encontrado cupones que coincidan con los términos de búsqueda"
                            : "Aún no se crearon cupones"
                    }
                />
            )}
        </>
    );
};

CouponsDashboard.propTypes = {};

export default CouponsDashboard;

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
            {
                id: "Eliminado",
                label: "Eliminado",
                code: false,
            },
            {
                id: "Expirado",
                label: "Expirado",
                code: false,
            },
            {
                id: "Agotado",
                label: "Agotado",
                code: false,
            },
        ],
    },
    {
        columnLabel: "Tipo de plan",
        items: [
            {
                id: "fixed_price",
                label: "Precio fijo",
                code: "fixed_price",
            },
            {
                id: "percentage",
                label: "Porcentaje",
                code: "percentage",
            },
            {
                id: "free_shipping",
                label: "Envío gratis",
                code: "free_shipping",
            },
        ],
    },
];
