'use client'
 
import { signInAction } from '@/lib/actions/auth';
import { Button, Grid, TextField } from '@mui/material';
import { useFormState } from 'react-dom';

export const SignInForm = () => {
  const [state, action] = useFormState(signInAction, null);

  return (
    <Grid container spacing={2} className="flex items-center justify-center h-screen">
      <Grid item xs={12} sm={6} className="p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Sign In</h2>
        <form action={action}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                fullWidth
              />
            </Grid>
          </Grid>
          {state?.errors?.email && (
            <Grid item xs={12}>
              <p className="text-red-500">{state?.errors.email}</p>
            </Grid>
          )}
          {state?.errors?.password && (
            <Grid item xs={12}>
              <p className="text-red-500">{state?.errors.password}</p>
            </Grid>
          )}
          {state?.error && (
            <Grid item xs={12}>
              <p className="text-red-500">{state?.error}</p>
            </Grid>
          )}
          <Grid item xs={12} className="mt-4">
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};