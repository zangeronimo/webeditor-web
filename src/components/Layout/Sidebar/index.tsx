import { FaChevronCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Header } from './styles';

export const Sidebar: React.FC = () => {
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
        <h2
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-controls="collapseExample"
        >
          WEBEditor
        </h2>
        <div className="collapse" id="collapseExample">
          <ul>
            <li data-bs-toggle="offcanvas">
              <Link to="/webeditor/usuarios">Usuários</Link>
            </li>
            <li data-bs-toggle="offcanvas">
              <Link to="/webeditor/empresas">Empresas</Link>
            </li>
            <li data-bs-toggle="offcanvas">
              <Link to="/webeditor/modulos">Módulos</Link>
            </li>
            <li>
              <Link to="/webeditor/regras" data-bs-toggle="offcanvas">
                Regras
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};
