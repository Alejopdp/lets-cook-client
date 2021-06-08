// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Internal components
import SearchInputField from "../../molecules/searchInputField/searchInputField";
import ButtonDropdownMenu from "../../molecules/buttonDropdownMenu/ButtonDropdownMenu";
import FilterByDropdown from "../../molecules/filterByDropdown/filterByDropdown";

// Icons & images
import ListIcon from "@material-ui/icons/List";

const RecipeFiltersAndSort = (props) => {
    return props.showFilters ? (
        <>
            <Grid item xs={12} sm={8} style={{ margin: '16px 0px' }}>
                <Box display="flex" alignItems="center">
                    <Box marginRight={2}>
                        <FilterByDropdown
                            handlerOnConfirm={props.handlerOnConfirm}
                            optionsSelected={props.optionsSelected}
                            options={props.filterOptions}
                        />
                    </Box>
                    <SearchInputField handlerOnChange={props.handlerOnSearchChange} placeholder="Buscar por nombre o SKU..." />
                </Box>
            </Grid>
            <Grid item xs={12} sm={4} style={{ margin: '16px 0px', display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonDropdownMenu
                    options={props.sortOptions}
                    label={props.label}
                    selected={props.selected}
                    handlerOnSelect={props.handlerOnSortSelect}
                >
                    <ListIcon />
                </ButtonDropdownMenu>
            </Grid>
            {/* </Box> */}
        </>
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