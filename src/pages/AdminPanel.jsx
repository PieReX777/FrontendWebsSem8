import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Avatar, 
  Card, 
  CardContent,
  Chip
} from '@mui/material';
import { 
  AdminPanelSettings, 
  People, 
  Settings, 
  Analytics,
  Security,
  LockPerson,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

const AdminPanel = () => {
  const user = { name: 'admin_user', role: 'ROLE_ADMIN' };
  const stats = [
    { value: '256', label: 'Usuarios totales' },
    { value: '12', label: 'Nuevos hoy' },
    { value: '5', label: 'Reportes activos' },
    { value: '98%', label: 'Uptime' }
  ];

  const quickActions = [
    { icon: <People />, label: 'Gestionar Usuarios', path: '/admin/users' },
    { icon: <Security />, label: 'Configurar Roles', path: '/admin/roles' },
    { icon: <Settings />, label: 'Ajustes del Sistema', path: '/admin/settings' },
    { icon: <Analytics />, label: 'Ver Estadísticas', path: '/admin/stats' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con bienvenida */}
      <Paper elevation={3} sx={{ 
        p: 3, 
        mb: 4, 
        background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)', 
        color: 'white',
        borderRadius: '12px'
      }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ 
            width: 60, 
            height: 60, 
            mr: 3, 
            bgcolor: 'white', 
            color: '#673ab7',
            border: '2px solid white'
          }}>
            <AdminPanelSettings fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Panel de Administración
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                Bienvenido, {user.name}
              </Typography>
              <Chip 
                label={user.role.replace('ROLE_', '')} 
                color="secondary"
                size="small"
                sx={{ color: 'white', fontWeight: 'bold' }}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Estadísticas rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: '12px' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Acciones rápidas */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Acciones Rápidas
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Button
              fullWidth
              variant="contained"
              startIcon={action.icon}
              sx={{ 
                py: 3,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(103, 58, 183, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Módulos principales */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Módulos Principales
      </Typography>
      
      <Grid container spacing={3}>
        {modules.map((module, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ 
              height: '100%', 
              borderRadius: '12px',
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #673ab7 0%, #9c27b0 100%)',
                    borderRadius: '12px',
                    color: 'white'
                  }}>
                    {module.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {module.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {module.description}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="secondary"
                  size="small"
                  sx={{ mt: 1 }}
                >
                  Acceder
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const modules = [
  {
    icon: <People fontSize="medium" />,
    title: 'Gestión de Usuarios',
    description: 'Administra todos los usuarios del sistema, edita sus roles y permisos.'
  },
  {
    icon: <LockPerson fontSize="medium" />,
    title: 'Seguridad',
    description: 'Configura políticas de seguridad, contraseñas y autenticación.'
  },
  {
    icon: <DashboardIcon fontSize="medium" />,
    title: 'Dashboard Avanzado',
    description: 'Métricas detalladas y análisis del uso del sistema.'
  },
  {
    icon: <Settings fontSize="medium" />,
    title: 'Configuración Global',
    description: 'Ajustes generales del sistema y personalización.'
  }
];

export default AdminPanel;