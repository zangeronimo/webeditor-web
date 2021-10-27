import { FaChevronCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { Container, Header } from './styles';

export const Sidebar: React.FC = () => {
  const { hasRole, hasOneRole } = useAuth();
  return (
    <Container
      className="offcanvas offcanvas-start"
      tabIndex={-1}
      id="offcanvasWEBEditor"
      aria-labelledby="offcanvasWEBEditorLabel"
    >
      <Header className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWEBEditorLabel">
          Menu Principal
        </h5>
        <FaChevronCircleLeft data-bs-dismiss="offcanvas" />
      </Header>
      <div className="offcanvas-body">
        <Link to="/dashboard">
          <h2 data-bs-toggle="offcanvas">Dashboard</h2>
        </Link>

        {hasOneRole(['INSTITUTIONALPAGE_VIEW']) && (
          <h2
            data-bs-toggle="collapse"
            data-bs-target="#collapseINSTITUTIONAL"
            aria-controls="collapseINSTITUTIONAL"
          >
            Institucional
          </h2>
        )}
        <div className="collapse" id="collapseINSTITUTIONAL">
          <ul>
            {hasRole('INSTITUTIONALPAGE_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/institucional/paginas">Páginas</Link>
              </li>
            )}
          </ul>
        </div>

        {hasOneRole([
          'RECIPELEVELS_VIEW',
          'RECIPECATEGORIES_VIEW',
          'RECIPERECIPES_VIEW',
          'RECIPEIMAGES_VIEW',
          'RECIPERATINGS_VIEW',
        ]) && (
          <h2
            data-bs-toggle="collapse"
            data-bs-target="#collapseCULINARIA"
            aria-controls="collapseCULINARIA"
          >
            Culinária
          </h2>
        )}
        <div className="collapse" id="collapseCULINARIA">
          <ul>
            {hasRole('RECIPERATINGS_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/culinaria/avaliacoes">Avaliações</Link>
              </li>
            )}
            {hasRole('RECIPECATEGORIES_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/culinaria/categorias">Categorias</Link>
              </li>
            )}
            {hasRole('RECIPEIMAGES_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/culinaria/imagens">Imagens</Link>
              </li>
            )}
            {hasRole('RECIPELEVELS_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/culinaria/niveis">Níveis</Link>
              </li>
            )}
            {hasRole('RECIPERECIPES_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/culinaria/receitas">Receitas</Link>
              </li>
            )}
          </ul>
        </div>

        {hasOneRole(['WEBEDITORUSER_VIEW']) && (
          <h2
            data-bs-toggle="collapse"
            data-bs-target="#collapseWEBEDITOR"
            aria-controls="collapseWEBEDITOR"
          >
            WEBEditor
          </h2>
        )}
        <div className="collapse" id="collapseWEBEDITOR">
          <ul>
            {hasRole('WEBEDITORUSER_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/webeditor/usuarios">Usuários</Link>
              </li>
            )}
          </ul>
        </div>

        {hasOneRole([
          'ADMINCOMPANY_VIEW',
          'ADMINMODULE_VIEW',
          'ADMINROLE_VIEW',
        ]) && (
          <h2
            data-bs-toggle="collapse"
            data-bs-target="#collapseADMINISTRADOR"
            aria-controls="collapseADMINISTRADOR"
          >
            Administrador
          </h2>
        )}
        <div className="collapse" id="collapseADMINISTRADOR">
          <ul>
            {hasRole('ADMINCOMPANY_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/webeditor/empresas">Empresas</Link>
              </li>
            )}
            {hasRole('ADMINMODULE_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/webeditor/modulos">Módulos</Link>
              </li>
            )}
            {hasRole('ADMINROLE_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/webeditor/regras">Regras</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};
