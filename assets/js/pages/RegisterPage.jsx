import React, {useState} from 'react';
import Field from '../components/forms/Field';
import UsersApi from '../services/UsersApi';
import { toast } from 'react-toastify';


const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        pseudo: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        pseudo: ""
    })

    //gestion de champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setUser({ ...user, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event =>{
        event.preventDefault();

        const apiErrors = {};
        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            return
        }

        try {
            await UsersApi.register(user);
            setErrors({})
            toast.success('Félicitation. rejoint la communauté !', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
            history.replace('/login');
            
        } catch (error) {
            console.log(error);
            const {violations} = error.response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                 apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.warn('Aie, le formulaire n\'a pas abouti !', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }    
        }
        
    }

    return ( <>
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit}>
            <Field 
                name="pseudo"
                label="Nom d'utilisateur"
                placeholder="Votre Pseudo visible par les autres utilisateur ..."
                error={errors.pseudo}
                value={user.pseudo}
                onChange={handleChange}
             />
             <Field 
                name="email"
                label="Email"
                placeholder="Votre email de connexion"
                error={errors.email}
                value={user.email}
                onChange={handleChange}
             />
             <Field 
                name="password"
                label="Mot de passe"
                type="password"
                placeholder="Votre mot de passe"
                error={errors.password}
                value={user.password}
                onChange={handleChange}
             />
             <Field 
                name="passwordConfirm"
                label="confirmation de mot de passe"
                type="password"
                placeholder="confirmer votre mot de passe"
                error={errors.passwordConfirm}
                value={user.passwordConfirm}
                onChange={handleChange}
             />
             <div className="form-group"><button type="submit" onClick={handleSubmit} className="btn btn-success">Je m'inscrit</button>
             </div>
        </form>
     </> );
}
 
export default RegisterPage;