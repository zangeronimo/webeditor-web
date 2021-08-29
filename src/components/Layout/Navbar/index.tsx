import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { Container, Logo, UserConfig } from './styles';

export const Navbar: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container className="navbar">
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
        <UserConfig>
          <button type="button" onClick={signOut}>
            Sair
          </button>
        </UserConfig>
      </div>
    </Container>
  );
};
