import React from 'react';
import { Switch } from 'react-router-dom';
import { Denied } from '../pages/system/401';
import { Dashboard } from '../pages/system/Dashboard';
import { Roles } from '../pages/system/Roles';
import { SignIn } from '../pages/system/SignIn';
import { Users } from '../pages/system/Users';
import { Form as UserForm } from '../pages/system/Users/Form';
import { Form as RoleForm } from '../pages/system/Roles/Form';

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

    <Route
      path="/webeditor/regras"
      exact
      component={Roles}
      isPrivate
      role="ADMINROLE_VIEW"
    />
    <Route
      path="/webeditor/regras/form/:id"
      component={RoleForm}
      isPrivate
      role="ADMINROLE_ALTER"
    />
  </Switch>
);

export default Routes;
