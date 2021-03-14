import React, {useContext} from 'react';
import AuthApi from '../services/AuthApi';
import { NavLink } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = ({history}) => {

  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  const handleLogout = () => {
    AuthApi.logout();
    setIsAuthenticated(false);
    toast.info('Vous êtes désormais déconnecté !', {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
      });
    history.push("/login");
  }

    return ( <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to="/">TrouveTaSoirée.com</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
  
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/events/edit/new">Ajouter un évènement</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/events">Liste d'évènements</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/map">Map</NavLink>
        </li>
        {(!isAuthenticated && (<> 
        <li className="nav-item">
          <NavLink to="/register" className="btn btn-warning ">S'inscrire</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="btn btn-success">Se connecter</NavLink>
        </li>
        </>)) || (
          <li className="nav-item">
          <button onClick={handleLogout} className="btn btn-danger">Se déconnecter</button>
          </li>
        )}
        
      </ul>
    </div>
  </nav> );
}
 
export default Navbar;