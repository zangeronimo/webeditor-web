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
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </Header>
      <div className="offcanvas-body">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          WEBEditor
        </button>
        <div className="collapse" id="collapseExample">
          <ul>
            <li>
              <Link to="/webeditor/usuarios" data-bs-toggle="offcanvas">
                Usuários
              </Link>
            </li>
            <li>
              <Link to="/webeditor/empresas" data-bs-toggle="offcanvas">
                Empresas
              </Link>
            </li>
            <li>
              <Link to="/webeditor/modulos" data-bs-toggle="offcanvas">
                Módulos
              </Link>
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
