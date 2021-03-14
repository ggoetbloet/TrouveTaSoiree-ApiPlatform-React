import React, {useState, useEffect} from 'react';
import Field from '../components/forms/Field';
import EventsApi from '../services/EventsApi';
import Select from '../components/forms/Select';
import CategoriesApi from '../services/CategoriesApi';
import { toast } from 'react-toastify';
import FormLoader from '../components/loaders/FormLoader';


const editEventPage = ({match, history}) => {
    const { id = "new" } = match.params;
    const [loading, setLoading] = useState(true)

    const [eventContent, setEvent] = useState({
        title: "",
        price: "",
        category: "",
        status: "ok"
    });

    const [categories, setCategories] =useState([]);

    const [errors, setErrors] = useState({
        title: "",
        price: "",
        category: "",
        status: ""
    });

    const [editing, setEditing] = useState(false);

    const fetchCategories = async () => {
        try {
           const data = await CategoriesApi.findAll();
           setCategories(data);
           setLoading(false);
           if(!eventContent.category) {setEvent({...eventContent, category: data[0].id })};
        } catch (error) {
            toast.warn('Une erreur est survenue !', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
            console.log(error.response);
        }
    }

    const fetchEventContent = async id => { 
        try {
            const { title, price, status, category} = await EventsApi.find(id);
            setEvent({ title, price, status, category: category.id });
            
           } catch (error) {
            toast.warn('Une erreur est survenue !', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
            //history.replace('/events');
           }
    };

        useEffect(()=>{
            fetchCategories();
          if(id !== 'new') {
                setEditing(true);
                fetchEventContent(id);
            };  
        }, [id])
        
    //gestion de champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setEvent({ ...eventContent, [name]: value});
    };

    //gestion du submit
    const handleSubmit = async event =>{
        event.preventDefault();
        try {
           setErrors({});
            if (editing) {
                await EventsApi.update(id, { ...eventContent, category: `/api/categories/${eventContent.category}`});
                toast.success('Bien modifié !', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }else{
                await EventsApi.create({ ...eventContent, category: `/api/categories/${eventContent.category}`});
                toast.success('Bien crée !', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }
            console.log(eventContent);
            history.replace("/events");

        } catch ({ response }) {
            console.log(response.data);
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                 apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.warn('Aie, petit problème !', {
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
        {(!editing && <h1>Création d'un événement</h1>) || (<h1>Modification d'un événement</h1>)}

    {loading && <FormLoader />}
    {!loading && (
        <form>
            <Field name="title" label="Titre de l'événement" value={eventContent.title} onChange={handleChange} error={errors.title} placeholder="Quel est le titre de l'événement ?" />
            <Field name="price" label="Prix" value={eventContent.price} onChange={handleChange} type="number" error={errors.price} placeholder="Cette événement est il payant ?" />
            <Select name="category" label="Categories" value={eventContent.category} onChange={handleChange} error={errors.category}>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option> 
                ))}
            </Select>
            <div className="form-group">
                <input name="status" id="status" type="checkbox" />
                <label htmlFor='status'> Masquer cette événement des autres utilisateur.</label>
            </div>
            
            <div className="form-group">
                {(!editing && <button type="submit" onClick={handleSubmit} className="btn btn-success">Ajouter</button>) || (<button type="submit" onClick={handleSubmit} className="btn btn-success">Modifier</button>)}
                
            </div>
        </form>
    )}
    </> );
}
 
export default editEventPage;