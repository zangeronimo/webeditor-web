import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { Button } from '../../Form/Button';
import { Container, Logo, UserConfig } from './styles';

export const Navbar: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container className="navbar bg-primary">
      <div className="container-fluid">
        <Logo>
          <Link className="navbar-brand" to="/dashboard" title="Dashboard">
            WEB<span>Editor</span>
          </Link>
        </Logo>
        <Button
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWEBEditor"
          aria-controls="offcanvasWEBEditor"
          title="Menu Principal"
        >
          <FaBars />
        </Button>
        <UserConfig>
          <Button onClick={signOut} title="Sair">
            <FaSignOutAlt />
          </Button>
        </UserConfig>
      </div>
    </Container>
  );
};
