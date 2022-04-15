import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"

import { useState } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import ThemeToggler from "./components/ThemeToggler";
import LoginForm from "./components/LoginForm";
import BikeListPage from "./components/BikeListPage";
import UserListPage from "./components/UserListPage";
import useApplication from "./hooks/useApplication";
import ErrorBoundary from "./components/ErrorBoundary";
import Page404 from "./components/404";

const Wrapper = styled.div`
  height: 100%;
`

function App() {
  const [theme, setTheme] = useState('light');
  const [, { login }] = useApplication()
  
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  const onLogin = (formData) => {
    console.log('formData', formData)
    login(formData)
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
        <ErrorBoundary>
          <Wrapper>
            <ThemeToggler onChange={() => { themeToggler() }} />
            <Routes>
              <Route path="/" element={<BikeListPage />} />
              <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
              <Route path="/list" element={<BikeListPage />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Wrapper>
        </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
