import { useMemo } from 'react';
import { FaChevronDown, FaUserAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../../../hooks/auth';
import { Button } from '../../../Form/Button';
import { Container, User, ShortName } from './styles';

export const Profile: React.FC = () => {
  const { signOut, user } = useAuth();

  const shortName = useMemo(() => {
    const splitedName = user.name.split(' ');
    if (splitedName.length) {
      const first = splitedName.shift()?.substring(0, 1) ?? '';
      const last = splitedName.pop()?.substring(0, 1) ?? first;

      return `${first.toUpperCase()} ${last?.toUpperCase()}`;
    }
    return '';
  }, [user.name]);

  return (
    <Container className="dropdown">
      <Button id="navbarDropdownMenuLink" data-bs-toggle="dropdown">
        <FaUserAlt size={20} />
        <span>
          <FaChevronDown size={16} />
        </span>
      </Button>
      <div
        className="dropdown-menu dropdown-menu-end"
        aria-labelledby="navbarDropdownMenuLink"
      >
        <User>
          {user.avatar ? (
            <img src={`http://localhost:3333${user.avatar}`} alt={user?.name} />
          ) : (
            <ShortName>{shortName}</ShortName>
          )}
          <p>{user?.name}</p>

          <Button
            className="btn btn-outline-primary form-control"
            onClick={signOut}
          >
            <FaSignOutAlt /> Sair{' '}
          </Button>
        </User>
      </div>
    </Container>
  );
};
