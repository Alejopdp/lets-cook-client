import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SimpleSelect = ({ title, value, items = [], handleChange = () => { }, ...props }) =>
    <FormControl fullWidth variant="outlined">
        {title && <InputLabel id="simple-select-label">{title}</InputLabel>}
        <Select
            labelId="simple-select-label"
            id="simple-select"
            value={value}
            onChange={handleChange}
            {...props}
        >
            {items.map(item => <MenuItem value={item}>{item}</MenuItem>)}
        </Select>
    </FormControl>

SimpleSelect.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleChange: PropTypes.func
}

SimpleSelect.defaultValues = {
    title: undefined,
    value: undefined,
    items: [],
    handleChange: () => { }
}

export default SimpleSelect;