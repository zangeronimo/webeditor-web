import React from 'react';
import { Switch } from 'react-router-dom';
import { Dashboard } from '../pages/System/Dashboard';
import { SignIn } from '../pages/System/SignIn';
import { Users } from '../pages/System/Users';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />

    <Route path="/webeditor/usuarios" component={Users} isPrivate />
  </Switch>
);

export default Routes;
