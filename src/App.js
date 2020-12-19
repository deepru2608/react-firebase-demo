import './App.css';
import Header from './Header';
import './firebase/config';
import Signup from './pages/Signup';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { UserProvider } from './firebase/UserProvider';
import Profile from './pages/Profile';
import Login from "./pages/Login";
import AuthenticateRedirect from './router/AuthenticateRedirect';
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from './router/AdminRoute';
import Users from './pages/Users';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <div className="container mt-3">
          <Switch>
            <AuthenticateRedirect exact path="/signup" component={Signup} />
            <AuthenticateRedirect exact path="/login" component={Login} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <AdminRoute exact path="/users" component={Users} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
