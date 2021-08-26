import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { format } from 'date-fns';
import Content from './Content';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, Typography } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import drawerItems from '../assets/data/drawer_menu.json';
import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
  },
  date: {
    flexGrow: 1,
  },
  rootNestedList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  page: {
    background: '#f9f9f9',
    width: '100%',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawPaper: {
    width: drawerWidth,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  capitalizeText: {
    textTransform: 'capitalize',
  },
  companyLogo: {
    flexGrow: 1,
    paddingLeft: theme.spacing(2),
  },
  darkToggle: {
    position: 'relative',
    justifyContent: 'center',
    paddingRight: theme.spacing(2),
  },
  active: {
    background: '#f4f4f4',
  },
}));

function Layout() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const oriexpandset = Object.assign({
    settings: Array.from(
      drawerItems.map((menu) => ({ id: menu.menuID, open: false }))
    ),
  });

  const [expandset, setExpandSetting] = useState(oriexpandset);

  const handleListClick = (idx) => {
    setExpandSetting((expandset) => ({
      ...expandset,
      settings: expandset.settings.map((item) =>
        item.id === idx ? { ...item, open: !item.open } : item
      ),
    }));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUsername('Ismail');
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* App bar */}
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Tooltip title="Show Menu">
              <MenuIcon />
            </Tooltip>
          </IconButton>
          <Typography className={classes.date}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Typography>{username}</Typography>
          <Avatar src="/mario-av.png" className={classes.avatar} />
        </Toolbar>
      </AppBar>

      {/* Side drawer */}

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography
            variant="button"
            className={classes.companyLogo}
            onClick={() => history.push('/home')}
          >
            COMPCODE
          </Typography>
          <Tooltip title="Hide Menu">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>

        <Divider />

        {drawerItems.map((val) => (
          <List
            key={val.menuID}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.rootNestedList}
          >
            <ListItem
              button
              onClick={() => {
                handleListClick(val.menuID);
              }}
            >
              <ListItemIcon>
                <i className={`MuiSvgIcon-root ` + val.menuIcon}></i>
              </ListItemIcon>
              <ListItemText
                className={classes.capitalizeText}
                primary={val.menuText}
              />
              {expandset.settings.find((item) => item.id === val.menuID)
                .open ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={
                expandset.settings.find((item) => item.id === val.menuID).open
              }
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {val.submenuItems.map((subval, subidx) => (
                  <ListItem
                    button
                    className={`
                    ${classes.nested} ${
                      location.pathname === subval.path ? classes.active : null
                    }
                    `}
                    key={subidx}
                    onClick={() => history.push(subval.path)}
                  >
                    <ListItemIcon>
                      <i className={`MuiSvgIcon-root ` + subval.icon}></i>
                    </ListItemIcon>
                    <ListItemText
                      className={classes.capitalizeText}
                      primary={subval.text}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
        <Divider />
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Dark Mode"
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content />
      </main>
    </div>
  );
}

export default Layout;
