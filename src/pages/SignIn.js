import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import { useAuth } from '../contexts/AuthContext';
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

export default function SignIn() {
    const { logInWithEmail, signInWithGoogle } = useAuth();
    const history = useHistory();
    const [error, setError] = React.useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            logInWithEmail(data.get('email'), data.get('password'))
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

    const [open, setOpen] = React.useState(false);

    const googleStyle = {
        background: 'linear-gradient(-120deg, #4285F4, #34A853, #FBBC05, #EA4335)',
        color: 'white'
    }

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };

    // const action = (
    //     <React.Fragment>
    //         <Button color="secondary" size="small" onClick={handleClose}>
    //             UNDO
    //         </Button>
    //         <IconButton
    //             size="small"
    //             aria-label="close"
    //             color="inherit"
    //             onClick={handleClose}
    //         >
    //             <CloseIcon fontSize="small" />
    //         </IconButton>
    //     </React.Fragment>
    // );


    return (
        <div>
            <Container component="main" maxWidth="xs" >
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        // onClick={handleOpen}
                        >
                            Sign In
                        </Button>

                        <Grid item xs align="center">
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item sx={{
                            paddingTop: 2
                        }} align="center">
                            <Link href="/signup" variant="elevation1" style={{ color: "#00adb5" }}>
                                {"Don't have an account?   Sign Up"}
                            </Link>
                        </Grid>
                        <Button
                            fullWidth
                            style={googleStyle}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleGoogleSignup}
                            startIcon={<GoogleIcon />}
                        >
                            Continue with Google
                        </Button>
                        {/* <Grid>
                            <Button onClick={handleOpen}>Open simple snackbar</Button>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                                message="Note archived"
                                action={action}
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button> */}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </div>
    );
}