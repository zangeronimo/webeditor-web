import React from 'react';
import { Switch } from 'react-router-dom';
import { Denied } from '../pages/system/401';
import { Dashboard } from '../pages/system/Dashboard';
import { SignIn } from '../pages/system/SignIn';
import { Users } from '../pages/system/Users';
import { Form as UserForm } from '../pages/system/Users/Form';
import { Roles } from '../pages/system/Roles';
import { Form as RoleForm } from '../pages/system/Roles/Form';
import { Companies } from '../pages/system/Companies';
import { Form as CompanyForm } from '../pages/system/Companies/Form';
import { Modules } from '../pages/system/Modules';
import { Form as ModuleForm } from '../pages/system/Modules/Form';
import { Pages } from '../pages/institutional/Pages';
import { Form as PageForm } from '../pages/institutional/Pages/Form';
import { Levels } from '../pages/recipe/Levels';
import { Form as LevelForm } from '../pages/recipe/Levels/Form';
import { Categories } from '../pages/recipe/Categories';
import { Form as CategoryForm } from '../pages/recipe/Categories/Form';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/401" component={Denied} isPrivate />

    {/* INSTITUCIONAL */}
    <Route
      path="/institucional/paginas"
      exact
      component={Pages}
      isPrivate
      role="INSTITUTIONALPAGES_VIEW"
    />
    <Route
      path="/institucional/paginas/form/:id?"
      component={PageForm}
      isPrivate
      role="INSTITUTIONALPAGES_ALTER"
    />

    {/* CULINÁRIA */}
    <Route
      path="/culinaria/niveis"
      exact
      component={Levels}
      isPrivate
      role="RECIPELEVELS_VIEW"
    />
    <Route
      path="/culinaria/niveis/form/:id?"
      component={LevelForm}
      isPrivate
      role="RECIPELEVELS_ALTER"
    />

    <Route
      path="/culinaria/categorias"
      exact
      component={Categories}
      isPrivate
      role="RECIPECATEGORIES_VIEW"
    />
    <Route
      path="/culinaria/categorias/form/:id?"
      component={CategoryForm}
      isPrivate
      role="RECIPECATEGORIES_ALTER"
    />

    {/* WEBEDITOR */}
    <Route
      path="/webeditor/usuarios"
      exact
      component={Users}
      isPrivate
      role="WEBEDITORUSER_VIEW"
    />
    <Route
      path="/webeditor/usuarios/form/:id?"
      component={UserForm}
      isPrivate
      role="WEBEDITORUSER_ALTER"
    />

    {/* ADMINISTRADOR */}
    <Route
      path="/webeditor/regras"
      exact
      component={Roles}
      isPrivate
      role="ADMINROLE_VIEW"
    />
    <Route
      path="/webeditor/regras/form/:id?"
      component={RoleForm}
      isPrivate
      role="ADMINROLE_ALTER"
    />

    <Route
      path="/webeditor/empresas"
      exact
      component={Companies}
      isPrivate
      role="ADMINCOMPANY_VIEW"
    />
    <Route
      path="/webeditor/empresas/form/:id?"
      component={CompanyForm}
      isPrivate
      role="ADMINCOMPANY_ALTER"
    />

    <Route
      path="/webeditor/modulos"
      exact
      component={Modules}
      isPrivate
      role="ADMINMODULE_VIEW"
    />
    <Route
      path="/webeditor/modulos/form/:id?"
      component={ModuleForm}
      isPrivate
      role="ADMINMODULE_ALTER"
    />
  </Switch>
);

export default Routes;
