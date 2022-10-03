import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { loginWithUserAndPassword, startGoogleSignIn } from '../../store/auth/thunks';


export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch()

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  })

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(loginWithUserAndPassword({email, password}));
  }

  const onGoogleSignIn = (event) => {
    event.preventDefault();
    dispatch(startGoogleSignIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Email"
              type="email"
              name='email'
              placeholder='example@google.com'
              fullWidth
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              onChange={onInputChange}
              label="Password"
              type="password"
              placeholder='Your Password'
              fullWidth
              name='password'
              value={ password }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

          <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

            <Grid item xs={12} sm={6}>
              <Button disabled = {isAuthenticating} type='submit' variant='contained' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled = {isAuthenticating} onClick={onGoogleSignIn} variant='contained' fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google Sign In</Typography>
              </Button>
            </Grid>
          </Grid>


          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Create account
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>
  )
}
