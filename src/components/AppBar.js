import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  CssBaseline,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Drawer,
} from '@material-ui/core';

import {
  Create,
  Home,
  Group,
  PeopleOutline,
  Menu,
  Dashboard,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import history from '../history';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'black',
    // backgroundColor: '#EB5E55',
    color: 'white',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Layout(props) {
  const { container, isAdmin, children, isSignedIn } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('Dashboard');
  if (!isSignedIn) return <Fragment>{children}</Fragment>;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }
  const renderListItem = (text, icon, onClick) => {
    return (
      <ListItem
        button
        key={text}
        onClick={() => {
          setSelected(text);
          onClick();
        }}
        selected={selected === text}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItem>
    );
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {renderListItem('Dashboard', <Home />, () => history.push('/'))}
        {renderListItem('Manage Invoices', <Create />, () =>
          history.push('/invoices'),
        )}
        {renderListItem('Manage Customers', <PeopleOutline />, () =>
          history.push('/customers'),
        )}
      </List>

      {isAdmin ? (
        <Fragment>
          <Divider />
          <List>
            {renderListItem('sd', <Create />)}
            {renderListItem('Create New Invoice', <Home />)}
          </List>
        </Fragment>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

const mapStateToProps = state => ({
  isAdmin: state.auth.isAdmin,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps)(Layout);
