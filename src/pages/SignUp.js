import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/AjithNair-cyber">
        GitHub Profile
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
  const [error, setError] = React.useState("")
  const { signInWithGoogle, signInWithEmail, currentUser } = useAuth();
  console.log(currentUser)
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get('email') === "" || data.get('password') === "" || data.get('confirm_password') === "" || data.get('name') === "") {
      setError("Enter all fields")
      return console.log(error)
    }
    if (data.get('password') !== data.get('confirm_password')) {
      setError("Passwords do not match")
      return console.log(error)
    }
    if (data.get("password").length < 6) {
      setError("Passwords length should be over 6 characters")
      return console.log(error)
    }

    setError("")

    try {
      const value = await signInWithEmail(data.get('email'), data.get('password'))
      console.log(value)
      history.push("/usercustomization")
    } catch (err) {
      setError(err)
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle()
      history.push("/usercustomization")
    } catch (err) {
      setError(err)
    }
  }

  const googleStyle = {
    background: 'linear-gradient(-120deg, #4285F4, #34A853, #FBBC05, #EA4335)',
    color: 'white'
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            padding: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container align="center">
              <Grid item >
                <Link href="/signin" variant="elevation1" style={{ color: "#00adb5" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              style={googleStyle}
              onClick={handleGoogleSignup}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<GoogleIcon />}
            >
              Continue With Google
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}