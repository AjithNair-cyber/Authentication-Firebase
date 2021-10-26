import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const UserCustomization = () => {
    const { logOut } = useAuth();
    const handleLogout = async () => {
        await logOut();
    }

    return <>
        <Button color="inherit" href="/signup" onClick={handleLogout}>Logout</Button>
    </>
}
export default UserCustomization;