import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MyAppBar from "./components/myAppBar";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import UserCustomization from "./pages/UserCustomization";
import ReRoute from "./components/ReRoute";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/DashBoard";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router >
        <AuthProvider>
          <MyAppBar />
          <div className="App">
            <Switch>
              <PrivateRoute path="/usercustomization" exact component={UserCustomization} />
              <PrivateRoute path="/" exact component={DashBoard} />
              <ReRoute path="/signup" component={SignUp} />
              <ReRoute path="/signin" component={SignIn} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider >
  );
}

export default App;
