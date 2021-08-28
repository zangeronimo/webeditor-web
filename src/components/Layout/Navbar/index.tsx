import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container, Logo } from './styles';

export const Navbar: React.FC = () => {
  return (
    <Container className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Logo>
          <Link className="navbar-brand" to="/dashboard">
            WEBEditor
          </Link>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWEBEditor"
            aria-controls="offcanvasWEBEditor"
          >
            <FaBars />
          </button>
        </Logo>
      </div>
    </Container>
  );
};
