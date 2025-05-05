import React from 'react';
import { Box, Typography, Paper, Grid, Button, Avatar, Card, CardContent } from '@mui/material';
import { Lock, Security, Devices, Dashboard } from '@mui/icons-material';

const ModeratorPanel = () => {
  const user = { name: 'moderador_test', role: 'ROLE_MODERATOR' };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con bienvenida */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)', color: 'white' }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 56, height: 56, mr: 2, bgcolor: 'white', color: '#3f51b5' }}>
            <Security fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              Bienvenido, {user.name}!
            </Typography>
            <Typography variant="subtitle1">
              Rol: {user.role.replace('ROLE_', '')}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Panel de acciones */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Dashboard />}
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            Panel de Moderador
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<Lock />}
            sx={{ py: 2, fontSize: '1.1rem' }}
          >
            Mi Perfil
          </Button>
        </Grid>
      </Grid>

      {/* Tarjetas de características */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
        Características principales
      </Typography>
      
      <Grid container spacing={3}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  mx: 'auto', 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)',
                  borderRadius: '50%',
                  color: 'white'
                }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const features = [
  {
    icon: <Lock fontSize="large" />,
    title: 'Autenticación Segura',
    description: 'Sistema de login con JWT para máxima seguridad en tus sesiones.'
  },
  {
    icon: <Security fontSize="large" />,
    title: 'Control de Accesos',
    description: 'Diferentes niveles de acceso según tu rol en el sistema.'
  },
  {
    icon: <Devices fontSize="large" />,
    title: 'Interfaz Intuitiva',
    description: 'Diseño responsive que se adapta a cualquier dispositivo.'
  }
];

export default ModeratorPanel;