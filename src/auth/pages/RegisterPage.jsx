import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks'
import { isValidEmail as validEmail } from '../../utils/validators';


export const RegisterPage = () => {

  const formData = { userName: '', email: '', password: '' };

  // I can use react form to validate 
  const formValidations = {
    userName: [(value) => value, 'UserName is mandatory'],
    email: [(value) => validEmail(value), 'Email is not valid'],
    password: [(value) => value.length >= 6, 'Password is not valid, should have more than 6 characters'],
  }

  const { userName, email, password, onInputChange,
    isValidUserName, isValidEmail, isValidPassword, isFormValid } = useForm(formData, formValidations)


  const onSubmit = (event) => {
    event.preventDefault();
  }

  return (

    <>
      <AuthLayout title="Create account">

      <h1> valid Form: {isFormValid ? 'Valid': 'Not Valid'}</h1>
        <form onSubmit={onSubmit}>
          <Grid container>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="User Name"
                type="text"
                fullWidth
                onChange={onInputChange}
                placeholder='User Name'
                name='userName'
                error={!!isValidUserName}
                helperText={isValidUserName}
                value={userName}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                onChange={onInputChange}
                label="Email"
                type="email"
                placeholder='example@google.com'
                fullWidth
                name='email'
                error={!!isValidEmail}
                helperText={isValidEmail}
                value={email}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                onChange={onInputChange}
                label="Password"
                type="password"
                placeholder='Password'
                fullWidth
                name='password'
                error={!!isValidPassword}
                helperText={isValidPassword}
                value={password}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={12}>
                <Button variant='contained' fullWidth>
                  Create Account
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}></Typography>
              <Link component={RouterLink} color='inherit' to="/auth/login">
                Login
              </Link>
            </Grid>

          </Grid>
        </form>

      </AuthLayout>
    </>
  )
}
