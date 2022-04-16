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
import LogoutPage from "./components/LogoutPage";
import ReservationsListPage from "./components/ReservationsPage";

const Wrapper = styled.div`
  height: 100%;
`

function App() {
  const [{ theme, user }] = useApplication()

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
        <ErrorBoundary>
          <Wrapper>
            <Routes>
              <Route path="/" element={<BikeListPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/list" element={<BikeListPage />} />
              <Route path="/reservations" element={<ReservationsListPage />} />
              {user && user.rol === 'manager' && (
                <Route path="/users" element={<UserListPage />} />
              )}
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Wrapper>
        </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
