import React, { Suspense } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blueGrey, lightBlue } from '@material-ui/core/colors';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from '../src/components/Layout';
import Loading from '../src/components/Loading';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lightBlue,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <Layout {...props} />}
            />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
