import React from 'react';
import { Switch } from 'react-router-dom';
import { Denied } from '../pages/system/401';
import { Dashboard } from '../pages/system/Dashboard';
import { SignIn } from '../pages/system/SignIn';
import { Users } from '../pages/system/Users';
import { Form as UserForm } from '../pages/system/Users/Form';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/401" component={Denied} isPrivate />

    <Route
      path="/webeditor/usuarios"
      exact
      component={Users}
      isPrivate
      role="WEBEDITORUSER_VIEW"
    />
    <Route
      path="/webeditor/usuarios/form/:id"
      component={UserForm}
      isPrivate
      role="WEBEDITORUSER_ALTER"
    />
  </Switch>
);

export default Routes;
