import React from "react";
import { Typography, List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar, Button, Link } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

const DashBoard = () => {
    const { getUserInfo, userInfo, currentUser } = useAuth();
    React.useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <>
            <Link href="/usercustomization" underline="none">
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="name" src={userInfo.profile_picture ? userInfo.profile_picture : currentUser.photoURL} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={userInfo.full_name ? userInfo.full_name : currentUser.displayName}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {userInfo.email ? userInfo.email : currentUser.email}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
                <Button variant="outlined" >
                    User Customization
                </Button>
            </Link>
        </>);

}

export default DashBoard;