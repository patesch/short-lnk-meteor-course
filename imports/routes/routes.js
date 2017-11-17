import React from 'react';
// ORIGINAL from Udemy Class -> import { Router, Route, browserHistory } from 'react-router';
import { Switch, Redirect, Router, Route } from 'react-router'; // customize by Pedro to adjust to the version Meteor 1.6
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Login from './../ui/Login.js'; // Signin
import Signup from './../ui/Signup.js';
import Link from './../ui/Link.js';
import NotFound from './../ui/NotFound.js';

const browserHistory = createBrowserHistory();
window.browserHistory = browserHistory; // Por causa dos componentes

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];
let isAuthenticated = false;

export const onAuthChange = (isAuth) => {
  isAuthenticated = isAuth;
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuth) // if on unauthenticated page and logged in, redirect to '/links'
    browserHistory.push('/links');
  else if (isAuthenticatedPage && !isAuth) // if on authenticated page and not logged in, redirect to '/'
    browserHistory.push('/');
  // else do nothing!
};

// Option 1: without Redirect to Not Found Page Component and Using render without component
// THIS OPTION NOT WORK PERFECTLY!!!
// export const routes = (
//   <Router history={browserHistory}>
//     <Switch>
//       <Route exact path="/" render={()=>(isAuthenticated ? <Redirect to="/links"/> : <Login/>)}/>
//       <Route path="/signup" render={()=>(isAuthenticated ? <Redirect to="/links"/> : <Signup/>)}/>
//       <Route path="/links" render={()=>(!isAuthenticated ? <Redirect to="/"/> : <Link/>)}/>
//       <Route path="/*" component={NotFound}/>
//     </Switch>
//   </Router>
// );

// Option 2: with Redirect to Not Found Page Component
export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/links" component={Link} />
      <Route exact path="/404" component={NotFound} />
      <Redirect to="/404" />
    </Switch>
  </Router>
);
