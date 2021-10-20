import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { Navbar } from './components/Layout/Navbar';
import { useAuth } from './hooks/auth';
import { Sidebar } from './components/Layout/Sidebar';
import { PageContent } from './components/Layout/PageContent';
import { Footer } from './components/Layout/Footer';

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
      <div className="page-content">
        <Navbar />
        <Sidebar />
        <PageContent>
          <Routes />
        </PageContent>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
