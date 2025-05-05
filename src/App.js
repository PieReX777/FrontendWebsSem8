import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Importaciones correctas para componentes por defecto
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import ModeratorPanel from './pages/ModeratorPanel';
import UserPanel from './pages/UserPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin" element={
            <PrivateRoute roles={['ROLE_ADMIN']}>
              <AdminPanel />
            </PrivateRoute>
          } />
          
          <Route path="/moderator" element={
            <PrivateRoute roles={['ROLE_MODERATOR']}>
              <ModeratorPanel />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <UserPanel />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    );
  </ThemeProvider>  
)}

export default App;