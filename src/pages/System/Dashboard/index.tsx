import { useAuth } from '../../../hooks/auth';

export const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <button type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
};
