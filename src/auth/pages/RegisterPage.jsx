import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks'
import { isValidEmail as validEmail } from '../../utils/validators';
import { startAutheticationWithEmail } from '../../store/auth/thunks';


const formData = { displayName: '', email: '', password: '' };

// I can use react form to validate 
const formValidations = {
  displayName: [(value) => value, 'Display name is mandatory'],
  email: [(value) => validEmail(value), 'Email is not valid'],
  password: [(value) => value.length >= 6, 'Password is not valid, should have more than 6 characters'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const ischeckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { formState, displayName, email, password, onInputChange,
    displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startAutheticationWithEmail(formState))
  }

  return (

    <>
      <AuthLayout title="Create account">
        <form onSubmit={onSubmit}>
          <Grid container>

            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Display Name"
                type="text"
                fullWidth
                onChange={onInputChange}
                placeholder='Display Name'
                name='displayName'
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
                value={displayName}
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
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
                value={password}
              />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              
              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={ 12 }>
                <Button 
                  disabled={ ischeckingAuthentication }
                  type="submit"
                  variant='contained' 
                  fullWidth>
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
