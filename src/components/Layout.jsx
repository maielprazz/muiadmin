import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Button from '@material-ui/core/Button';
// import SvgIcon from '@material-ui/core/SvgIcon';
import logo from '../assets/images/MAP-AKTIF.png';
import { logout } from '../actions/userActions';
// import mario from '../assets/images/mario-av.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginLeft: theme.spacing(2),
  },
  logout: {
    marginLeft: theme.spacing(1),
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
    background: '#a4a4a4',
  },
  logo: {
    maxWidth: 80,
    maxHeight: 64,
    marginRight: theme.spacing(4),
  },
}));

function Layout() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(true);
  // const [username, setUsername] = useState('');
  const [checked, setChecked] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleTheme = () => {
    setChecked((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout());
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

  const dispatch = useDispatch();
  // useEffect(() => {
  //   setUsername('Ismail');
  // }, []);

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
            {format(new Date(), 'do MMM Y')}
          </Typography>
          <Typography>
            Hi,{' '}
            {userInfo ? (
              <span className={classes.capitalizeText}>
                {userInfo.username.toString().replace('.', ' ')}
              </span>
            ) : (
              <span className={classes.capitalizeText}>Guest</span>
            )}
          </Typography>
          {/* <Avatar src={} className={classes.avatar} /> */}
          {userInfo ? (
            <Button
              className={classes.logout}
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              className={classes.logout}
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={() => history.push('/login')}
            >
              Login
            </Button>
          )}
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
          <img
            src={logo}
            alt="MAP AKTIF LOGO"
            className={classes.logo}
            onClick={() => history.push('/home')}
          />
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
        {/* <FormControlLabel
          control={<Switch checked={checked} onChange={handleTheme} />}
          label="Dark Mode"
        /> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Content user={userInfo} />
      </main>
    </div>
  );
}

export default Layout;
