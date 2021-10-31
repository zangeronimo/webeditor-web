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
              <li>
                <Link to="/institucional/paginas">
                  <span data-bs-toggle="offcanvas">Páginas</span>
                </Link>
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
              <li>
                <Link to="/culinaria/avaliacoes">
                  <span data-bs-toggle="offcanvas">Avaliações</span>
                </Link>
              </li>
            )}
            {hasRole('RECIPECATEGORIES_VIEW') && (
              <li>
                <Link to="/culinaria/categorias">
                  <span data-bs-toggle="offcanvas">Categorias</span>
                </Link>
              </li>
            )}
            {hasRole('RECIPEIMAGES_VIEW') && (
              <li>
                <Link to="/culinaria/imagens">
                  <span data-bs-toggle="offcanvas">Imagens</span>
                </Link>
              </li>
            )}
            {hasRole('RECIPELEVELS_VIEW') && (
              <li>
                <Link to="/culinaria/niveis">
                  <span data-bs-toggle="offcanvas">Níveis</span>
                </Link>
              </li>
            )}
            {hasRole('RECIPERECIPES_VIEW') && (
              <li>
                <Link to="/culinaria/receitas">
                  <span data-bs-toggle="offcanvas">Receitas</span>
                </Link>
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
              <li>
                <Link to="/webeditor/usuarios">
                  <span data-bs-toggle="offcanvas">Usuários</span>
                </Link>
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
              <li>
                <Link to="/webeditor/empresas">
                  <span data-bs-toggle="offcanvas">Empresas</span>
                </Link>
              </li>
            )}
            {hasRole('ADMINMODULE_VIEW') && (
              <li>
                <Link to="/webeditor/modulos">
                  <span data-bs-toggle="offcanvas">Módulos</span>
                </Link>
              </li>
            )}
            {hasRole('ADMINROLE_VIEW') && (
              <li>
                <Link to="/webeditor/regras">
                  <span data-bs-toggle="offcanvas">Regras</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};
