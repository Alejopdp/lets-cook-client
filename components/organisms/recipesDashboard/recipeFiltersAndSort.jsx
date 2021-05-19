// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import SeacrhInputField from "../../molecules/searchInputField/searchInputField";
import ButtonDropdownMenu from "../../molecules/buttonDropdownMenu/ButtonDropdownMenu";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";

// Icons & images
import ListIcon from "@material-ui/icons/List";

const RecipeFiltersAndSort = (props) => {
    return props.showFilters ? (
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" marginY={2}>
            <Box display="flex" alignItems="center">
                <Box marginRight={2}>
                    <FilterByDropdown
                        handlerOnConfirm={props.handlerOnConfirm}
                        optionsSelected={props.optionsSelected}
                        options={props.filterOptions}
                    />
                </Box>
                <SeacrhInputField handlerOnChange={props.handlerOnSearchChange} />
            </Box>
            <ButtonDropdownMenu
                options={props.sortOptions}
                label={props.label}
                selected={props.selected}
                handlerOnSelect={props.handlerOnSortSelect}
            >
                <ListIcon />
            </ButtonDropdownMenu>
        </Box>
    ) : (
        <></>
    );
};

RecipeFiltersAndSort.propTypes = {
    showFilters: PropTypes.bool.isRequired,
    optionsSelected: PropTypes.array.isRequired,
    handlerOnConfirm: PropTypes.func.isRequired,
    filterOptions: PropTypes.array.isRequired,
    handlerOnSearchChange: PropTypes.func.isRequired,
    sortOptions: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    handlerOnSortSelect: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

export default RecipeFiltersAndSort;

// {recipesList.length > 0 && (
//     <Grid item container spacing={3} justify="center">
//         <Grid item>
//             <FilterByDropdown handlerOnConfirm={_handleApplyFilters} optionsSelected={filters} options={_filterOptions} />
//         </Grid>
//         <Grid item xs>
//             <SeacrhInputField handlerOnChange={_handleSearchText} />
//         </Grid>
//         <Grid item>
//             <ButtonDropdownMenu
//                 options={_sortOptions}
//                 label={sortBy.label}
//                 selected={sortBy.code}
//                 handlerOnSelect={_handleSortListBy}
//             >
//                 <ListIcon />
//             </ButtonDropdownMenu>
//         </Grid>
//     </Grid>
// )}
