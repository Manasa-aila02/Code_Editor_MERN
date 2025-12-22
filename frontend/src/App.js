import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import SignUp from './Components/Home/SignUp'
import Login from './Components/Home/Login'
import UserProvider from './Components/context/UserContext';
import PlaygroundProvider from './Components/context/PlaygroundContext';
import ModalProvider from './Components/context/ModalContext';
import { GlobalStyle } from './GlobalStyle';
import {Playground } from "./Components/PlaygroundScreen/index.js";
function App() {
  return (
    <UserProvider>
    <PlaygroundProvider>
      <ModalProvider>
        <BrowserRouter>
        <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Home" element={<Home />}/>
            <Route path="/playground/:folderId/:playgroundId" element={<Playground />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </PlaygroundProvider>
    </UserProvider>
  );
}

export default App;
