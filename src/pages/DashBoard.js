import React from "react";
import { Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const DashBoard = () => {
    const { getUserInfo } = useAuth();
    React.useEffect(() => {
        getUserInfo()
    }, [])
    return <div>
        <a href="/usercustomization">
            User Customization
        </a>
    </div>

}

export default DashBoard;