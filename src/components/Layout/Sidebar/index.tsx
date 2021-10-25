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
            data-bs-target="#collapseExample"
            aria-controls="collapseExample"
          >
            Institucional
          </h2>
        )}
        <div className="collapse" id="collapseExample">
          <ul>
            {hasRole('INSTITUTIONALPAGE_VIEW') && (
              <li data-bs-toggle="offcanvas">
                <Link to="/institucional/paginas">Páginas</Link>
              </li>
            )}
          </ul>
        </div>

        {hasOneRole(['WEBEDITORUSER_VIEW']) && (
          <h2
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-controls="collapseExample"
          >
            WEBEditor
          </h2>
        )}
        <div className="collapse" id="collapseExample">
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
            data-bs-target="#collapseExample"
            aria-controls="collapseExample"
          >
            Administrador
          </h2>
        )}
        <div className="collapse" id="collapseExample">
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
              <li>
                <Link to="/webeditor/regras" data-bs-toggle="offcanvas">
                  Regras
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};
