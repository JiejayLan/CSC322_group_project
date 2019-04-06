import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import sellingForm from '../components/sellItemForm';
import ItemPage from '../components/ItemPage';
import HomePage from '../components/HomePage';
import RegisterPage from '../components/RegisterPage';
import SUhomePage from '../components/SUhomePage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
  <div>
    <Switch>
      <PrivateRoute path="/register" component={RegisterPage}/>
      <PublicRoute path="/" component={LoginPage} exact={true}/>
      <PrivateRoute path="/home" component={HomePage} exact={true}/>
      <PrivateRoute path="/SUhome" component={SUhomePage} exact={true}/>
      <PrivateRoute path="/sellnewitem" component={sellingForm} exact={true}/>
      <PrivateRoute path="/dashboard" component={DashboardPage}/>
	  <PrivateRoute path="/items/:id" component={ItemPage} exact={true}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </div>
</Router>
);

export default AppRouter;