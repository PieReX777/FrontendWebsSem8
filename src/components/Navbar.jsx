import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { AuthService } from '../services/auth.service'; // <-- Agrega esta línea

const Navbar = () => {
  const user = AuthService.getCurrentUser();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          JWT App
        </Typography>
        
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            
            {user.roles.includes('ROLE_ADMIN') && (
              <Button color="inherit" component={Link} to="/admin">Admin</Button>
            )}
            
            {user.roles.includes('ROLE_MODERATOR') && (
              <Button color="inherit" component={Link} to="/moderator">Moderator</Button>
            )}
            
            <Button color="inherit" onClick={AuthService.logout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;