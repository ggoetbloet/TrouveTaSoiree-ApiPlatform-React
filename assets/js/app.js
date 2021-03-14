import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import AdminEventPage from './pages/AdminEventPage';
import EventsPage from './pages/EventsPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';
import AuthApi from './services/AuthApi';
import editEventPage from './pages/editEventPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

AuthApi.setup();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated);
    const NavbarWithRouter = withRouter(Navbar);
    
    return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
    <HashRouter>
        <NavbarWithRouter />
        <main className="container pt-5">
            <Switch>
                <Route path="/register" component={RegisterPage} />
                <Route path="/login" render={props => <LoginPage onLogin={setIsAuthenticated} {...props} />} />
                <PrivateRoute path="/events/edit/:id" component={editEventPage} />
                <Route path="/events" component={EventsPage} />
                <PrivateRoute path="/map" component={MapPage} />
                <Route path="/admin/events" component={AdminEventPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
    </HashRouter>
    <ToastContainer />
    </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
 
 