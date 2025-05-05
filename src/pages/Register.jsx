import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { AuthService } from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate(); // Obtiene la función de navegación

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      roles: ['user']
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required').min(3, 'Minimum 3 characters'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required').min(6, 'Minimum 6 characters')
    }),
    onSubmit: async (values) => {
      try {
        const response = await AuthService.register(
          values.username,
          values.email,
          values.password,
          values.roles
        );
        alert('Registration successful!');
        navigate('/'); // Redirige al home después del registro exitoso
      } catch (error) {
        alert('Registration failed: ' + (error.response?.data?.message || error.message));
      }
    }
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            margin="normal"
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          
          <Button 
            color="primary" 
            variant="contained" 
            fullWidth 
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;