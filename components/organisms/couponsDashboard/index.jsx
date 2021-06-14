// Utils & config
import React from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";

// Internal components
import CreateDashboardTitle from "../../molecules/createDsahboardTitle/createDashboardTitle";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";
import SearchInputFIeld from "../../molecules/searchInputField/searchInputField";
// import PlansGrid from "./plansGrid";
import SimpleModal from "../../molecules/simpleModal/simpleModal";
import EmptyImage from "../../molecules/emptyImage/emptyImage";

const CouponsDashboard = props => {
    
    const router = useRouter();
    const [coupons, setcoupons] = useState([...props.coupons] || []);
    const [filtersBy, setfiltersBy] = useState([]);
    const [searchValue, setsearchValue] = useState("");
    const [selectedCoupon, setselectedCoupon] = useState({});
    const [isToggleStateModalOpen, setisToggleStateModalOpen] = useState(false);
    const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleApplyFilters = (filters = []) => {
        setfiltersBy(filters);
    };

    const handleRemoveFilter = (itemFilterToRemove) => {
        setfiltersBy(filtersBy.filter((itemFilter) => itemFilter.id !== itemFilterToRemove.id));
    };

    // const handleToggleState = async () => {
    //     const res = await togglePlanState(selectedCoupon.id);

    //     if (res.status === 200) {
    //         setcoupons(coupons.map((coupon) => (coupon.id === selectedCoupon.id ? { ...selectedCoupon, isActive: !selectedCoupon.isActive } : coupon)));
    //         setselectedCoupon({});
    //         setisToggleStateModalOpen(false);
    //         enqueueSnackbar("Se ha cambiado el estado correctamente", {
    //             variant: "success",
    //         });
    //     } else {
    //         enqueueSnackbar("Error al cambiar el estado", {
    //             variant: "error",
    //         });
    //     }
    // };

    const handleDelete = async () => {
        const res = await deleteCoupon(selectedCoupon.id);

        if (res.status === 200) {
            setcoupons(coupons.filter((coupon) => coupon.id !== selectedCoupon.id));
            setselectedCoupon({});
            setisDeleteModalOpen(false);
            enqueueSnackbar("Se ha eliminado el cupón correctamente", {
                variant: "success",
            });
        } else {
            enqueueSnackbar("Error al eliminar el cupón", {
                variant: "error",
            });
        }
    };

    const handleOpenToggleStateModal = (coupon) => {
        setselectedCoupon(coupon);
        setisToggleStateModalOpen(true);
    };

    const handleOpenDeleteModal = (coupon) => {
        setselectedCoupon(coupon);
        setisDeleteModalOpen(true);
    };

    const filterCouponsBySearchValue = () => {
        return coupons.filter(
            (coupon) =>
            coupon.couponCode.toUpperCase().indexOf(searchValue.toUpperCase()) > -1
        );
    };

    const filteredCoupons =
        filtersBy.length > 0
            ? filterCouponsBySearchValue().filter((coupon) =>
                  filtersBy.some((filterItem) => coupon.type === filterItem.code || coupon.isActive === filterItem.code)
              )
            : filterCouponsBySearchValue();

    
    return (
        <div>
            
        </div>
    )
}

CouponsDashboard.propTypes = {

}

export default CouponsDashboard
