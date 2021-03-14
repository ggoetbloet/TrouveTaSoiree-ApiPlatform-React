import React, {useState, useContext} from 'react';
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';

const LoginPage = ({history}) => {

    const { setIsAuthenticated } = useContext( AuthContext)
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //gestion de champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({ ...credentials, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event =>{
        event.preventDefault();

        try {
         await AuthApi.authenticate(credentials);
           setError("");
           setIsAuthenticated(true);
           toast.success('Vous êtes désormais connecté !', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
           history.replace("/events");
           
        } catch (error) {
            
            setError("On dirait que l\'adresse ou le mot de passe ne correspondent pas !");
            toast.error('Aie, vous n\'êtes pas connecté !', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
        }
    
    }

    return ( <>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
            <Field 
                name="username" 
                label="Adresse Email" 
                value={credentials.username}
                onChange={handleChange} 
                placeholder="Votre adresse email" 
                type="email" 
                error={error}  
            />
            
            <Field 
                name="password" 
                label="Mot de passe" 
                value={credentials.password}
                onChange={handleChange} 
                placeholder="Votre mot de passe" 
                type="password" 
                error={error}  
                />
            
            <div className="form-group">
                <button type="submit" className="btn btn-success">Me connecter</button>
                </div>
        </form>
    </> );
}
 
export default LoginPage;