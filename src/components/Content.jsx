import React, { Suspense, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Home from './Home';
import Dashboard from './Dashboard';
import Storemaster from './Storemaster';
import Loading from './Loading';
import ProjectList from './ProjectList';
import Download from './Download';
import Upload from './Upload';
import ServerInfo from './ServerInfo';
import Pricecheck from './Pricecheck';
import ListServer from './ServerList';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="http://jkthomaasql03/">
        IT MAA Data Analytics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

function Content(user) {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!user.user) {
      history.push('/login');
    }
  }, [user, history]);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route
          exact
          path="/home"
          name="Landing"
          render={(props) => <Home {...props} />}
        />
        <Route
          exact
          path="/dashboard"
          name="Dashboard"
          render={(props) => <Dashboard {...props} />}
        />
        <Route
          path="/storemaster"
          name="Storemaster"
          render={(props) => <Storemaster {...props} />}
        />
        <Route
          path="/pricecheck"
          name="Price Checking"
          render={(props) => <Pricecheck {...props} />}
        />
        <Route
          path="/ServerList"
          name="Server List"
          render={(props) => <ListServer {...props} />}
        />
        <Route
          path="/upload"
          name="Upload"
          render={(props) => <Upload {...props} />}
        />
        <Route
          path="/download"
          name="Download"
          render={(props) => <Download {...props} />}
        />
        <Route
          path="/project"
          name="Project List"
          render={(props) => <ProjectList {...props} />}
        />
        <Route
          path="/serverinfo"
          name="Server Info"
          render={(props) => <ServerInfo {...props} />}
        />
        <Route
          exact
          path="/"
          name="Landing"
          render={(props) => <Home {...props} />}
        />
      </Switch>
      <div className={classes.toolbar}>
        <div className={classes.footer}>
          <Container>
            <Copyright />
          </Container>
        </div>
      </div>
    </Suspense>
  );
}

export default Content;
