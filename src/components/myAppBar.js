import React from "react";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from "../contexts/AuthContext";

const MyAppBar = () => {
    const { logOut, currentUser } = useAuth();
    const handleLogout = async () => {
        await logOut();
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Internship Assignment
                    </Typography>
                    {!currentUser ? <Button color="inherit" href="/signup">SignUp</Button> : <> </>}
                    {!currentUser ? <Button color="inherit" href="/signin">SignIn</Button> : <> </>}
                    {currentUser ? <Button color="inherit" href="/signup" onClick={handleLogout}>Logout</Button> : <> </>}
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default MyAppBar;