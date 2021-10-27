import React from "react";
import { Button, Alert } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import Box from '@mui/material/Box';
import { Container, CssBaseline, TextField, Typography, Grid } from "@mui/material";
import { useHistory } from 'react-router-dom'


const UserCustomization = () => {
    const { logOut, currentUser, updateUserInfo } = useAuth();
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const history = useHistory()
    const handleLogout = async () => {
        await logOut();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('name') === "" || data.get('address') === "" || data.get('age').toString() === "") {
            setError("Enter all fields")
            return console.log(error)
        }
        setError("")
        try {
            updateUserInfo(data.get('name'), data.get('address'), data.get('age').toString())
            setSuccess(true)
            history.push("/")
        } catch (err) {
            setError(err)
        }
    }

    return (
        <div>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justify: "center",
                        boxShadow: 3,
                        padding: 5,
                    }}
                >
                    <Typography component="h1" variant="h5">
                        User Customization
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success ? <Alert severity="success">Changed Successfully</Alert> : <Alert></Alert> }
                    <Box borderRadius="50%"><img src={currentUser.photoURL} alt="profile pic" /></Box>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
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
                                    id="address"
                                    label="Address "
                                    name="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="age"
                                    label="Age"
                                    type="number"
                                    id="age"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, ml: 35 }}
                            onSubmit={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Container>
        </div>);
}
export default UserCustomization;