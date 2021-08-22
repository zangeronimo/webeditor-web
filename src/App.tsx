import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { Navbar } from './components/Layout/Navbar';
import { useAuth } from './hooks/auth';
import { Sidebar } from './components/Layout/Sidebar';

const App: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
