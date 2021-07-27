import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./styles/global";
import Hooks from "./hooks";
import Routes from "./routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Hooks>
        <Routes />
        <GlobalStyle />
      </Hooks>
    </BrowserRouter>
  );
};

export default App;
