import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AppBar, Toolbar, Typography, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CssBaseline from '@material-ui/core/CssBaseline';
import HomePage from '../HomePage/HomePage';
import Article from '../../components/Article/Article';
import FavoriteContextProvider from '../../context/FavoriteArticleContext';
import BackToTop from '../../components/BackToTop'
import './App.css';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#052962'
    },
    secondary: {
      main: '#c70000'
    },
    text: {
      secondary: 'white'
    }
  },

})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  titleLink: {
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'white'
  }
}));

function App(props) {
  const classes = useStyles();
  return (
    <MuiThemeProvider theme={customTheme}>
      <FavoriteContextProvider>
        <BrowserRouter>
          <CssBaseline />
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar className= 'app_bar'>
                <Typography variant="h3" color="textSecondary">
                  <a href ='/'className = {classes.titleLink}>NewsFeed</a>
                  </Typography>
              </Toolbar>
            </AppBar>
            <div id="back-to-top-anchor"/>
          </div>

          <Switch>
            <Route
              exact
              path="/home"
              component={HomePage}
            />
            <Route
              path="/:articleId"
              component={Article}
            />
            <Redirect to="/home" />
          </Switch>

          <BackToTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </BackToTop>
        </BrowserRouter>
      </FavoriteContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
