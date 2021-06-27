import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Autorenew as RefreshIcon } from "@material-ui/icons";

const RefreshButton = ({ color, handleOnclick = () => {} }) => (
    <IconButton onClick={handleOnclick} color="default" aria-label="Intentar de nuevo" component="span">
        <RefreshIcon style={{ fill: color || '#fff' }} />
    </IconButton>
);

RefreshButton.propTypes = {
    color: PropTypes.string,
    handleOnclick: PropTypes.func,
};

export default RefreshButton;
