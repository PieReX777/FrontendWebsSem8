import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  useTheme 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { 
  Lock, 
  Security, 
  Devices, 
  AdminPanelSettings, 
  People, 
  HowToReg,
  Logout
} from '@mui/icons-material';

const Home = () => {
  const user = AuthService.getCurrentUser();
  const isAuthenticated = !!user;
  const theme = useTheme();

  const features = [
    {
      icon: <Lock fontSize="large" />,
      title: "Autenticación Segura",
      description: "Sistema de login con JWT para máxima seguridad en tus sesiones."
    },
    {
      icon: <Security fontSize="large" />,
      title: "Control de Accesos",
      description: "Diferentes niveles de acceso según tu rol en el sistema."
    },
    {
      icon: <Devices fontSize="large" />,
      title: "Interfaz Intuitiva",
      description: "Diseño responsive que se adapta a cualquier dispositivo."
    }
  ];

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = '/login'; // Redirigir a login después de cerrar sesión
  };

  return (
    <Box sx={{ 
      p: 3,
      minHeight: '100vh',
      background: theme.palette.mode === 'dark' 
        ? theme.palette.background.default 
        : theme.palette.grey[50]
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center',
        py: 8,
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        borderRadius: 2,
        mb: 4,
        position: 'relative'
      }}>
        {isAuthenticated && (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              borderRadius: 5,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Salir
          </Button>
        )}
        <Typography variant="h2" component="h1" sx={{ 
          fontWeight: 700,
          mb: 2
        }}>
          Bienvenido a nuestra plataforma
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          {isAuthenticated 
            ? `Gestión segura para ${user.roles.join(', ').replace('ROLE_', '')}s`
            : "Sistema de autenticación con control de accesos"}
        </Typography>
      </Box>

      {/* User Dashboard */}
      {isAuthenticated ? (
        <Box sx={{ maxWidth: 1000, mx: 'auto', mb: 6 }}>
          <Paper elevation={3} sx={{ 
            p: 4, 
            mb: 4,
            background: theme.palette.background.paper,
            borderRadius: 3
          }}>
            <Box display="flex" alignItems="center" mb={3}>
              <Avatar sx={{ 
                width: 64, 
                height: 64, 
                mr: 3,
                bgcolor: theme.palette.secondary.main,
                fontSize: '2rem'
              }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
                  ¡Hola, {user.username}!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Rol: {user.roles.map(role => role.replace('ROLE_', '')).join(', ')}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {user.roles.includes('ROLE_ADMIN') && (
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/admin"
                    size="large"
                    startIcon={<AdminPanelSettings />}
                    sx={{ py: 2, fontSize: '1rem' }}
                  >
                    Panel Admin
                  </Button>
                </Grid>
              )}
              {user.roles.includes('ROLE_MODERATOR') && (
                <Grid item xs={12} md={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/moderator"
                    size="large"
                    startIcon={<Security />}
                    sx={{ py: 2, fontSize: '1rem' }}
                  >
                    Panel Moderador
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to="/profile"
                  size="large"
                  startIcon={<People />}
                  sx={{ py: 2, fontSize: '1rem' }}
                >
                  Mi Perfil
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 6 }}>
          <Paper elevation={3} sx={{ 
            p: 4,
            background: theme.palette.background.paper,
            borderRadius: 3
          }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              Accede a tu cuenta
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
              Inicia sesión o regístrate para comenzar a utilizar todas las funcionalidades
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to="/login"
                  size="large"
                  startIcon={<Lock />}
                  sx={{ py: 2 }}
                >
                  Iniciar Sesión
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/register"
                  size="large"
                  startIcon={<HowToReg />}
                  sx={{ py: 2 }}
                >
                  Registrarse
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}

      {/* Features Section */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Typography variant="h3" align="center" sx={{ 
          mb: 6,
          fontWeight: 700,
          color: theme.palette.mode === 'dark' ? 'white' : 'text.primary'
        }}>
          Características principales
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ 
                height: '100%',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}>
                <CardContent sx={{ 
                  textAlign: 'center',
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <Avatar sx={{ 
                    width: 60, 
                    height: 60, 
                    mb: 3,
                    bgcolor: theme.palette.primary.main,
                    color: 'white'
                  }}>
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h5" component="h3" sx={{ 
                    mb: 2,
                    fontWeight: 600
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      {!isAuthenticated && (
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8,
          mb: 4
        }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            ¿Listo para comenzar?
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/register"
            size="large"
            sx={{ 
              px: 6,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Regístrate Gratis
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;