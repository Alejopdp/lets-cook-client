// Utils & Config
import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";

// Internal components
import ItemListWithIcon from "../../molecules/itemListWithIcon/itemListWIthIcon";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.fourthColor,
  },
  appBarSpacer: theme.mixins.toolbar,
}));

const FixedDrawer = (props) => {
  const classes = useStyles();
  const [selectedIndex, setselectedIndex] = useState(0);

  const handleOptionClick = (path) => {
    // history.push(path);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.appBarSpacer} />

        <List>
          {props.sidebarOptions.map((item, index) => (
            <ItemListWithIcon
              text={item.text}
              key={index}
              path={item.path}
              index={index}
              icon={item.icon}
              handleOptionClick={() => handleOptionClick(item.path)}
            />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

FixedDrawer.propTypes = {
  sidebarOptions: PropTypes.array.isRequired,
};

export default FixedDrawer;
