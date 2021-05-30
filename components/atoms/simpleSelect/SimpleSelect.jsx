import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const SimpleSelect = ({ name, title, value, items = [], handleChange = () => { }, ...props }) =>
    <FormControl fullWidth variant="outlined">
        {title && <InputLabel id="simple-select-label">{title}</InputLabel>}
        <Select
            labelId={title && "simple-select-label"}
            // id="simple-select"
            value={value}
            name={name}
            onChange={handleChange}
        >
            {items.map((item,key) => <MenuItem key={key} value={item}>{item}</MenuItem>)}
        </Select>
    </FormControl>

SimpleSelect.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string,
    handleChange: PropTypes.func
}

SimpleSelect.defaultValues = {
    title: undefined,
    value: undefined,
    name: undefined,
    items: [],
    handleChange: () => { }
}

export default SimpleSelect;