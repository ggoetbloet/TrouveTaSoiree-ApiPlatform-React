import React, {useEffect, useState} from 'react';
import Pagination from '../components/Pagination';
import moment from "moment";
import {Link} from 'react-router-dom'
import EventsApi from "../services/EventsApi";
import ProductDetails from '../components/loaders/ProductDetails';

const EventsPage = (props) => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)
    const itemsPerPage = 15;

    // permet d'aller chercher les Events
    const fetchEvents = async () => {
        try {
            const data = await EventsApi.findAll()
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.log(error.response)
        }
    }

    // au chargement du composant on va chercher les events
    useEffect(() => {fetchEvents()}, [] )

    // Gestion du changement de page 
    const handlePageChange = (page => setCurrentPage(page));

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    //Filtrage des events en fonction de la recherche
    const filteredEvents = events.filter(
        e => 
        e.title.toLowerCase().includes(search.toLowerCase())
        );

    // Pagination des données
    const paginatedEvents = Pagination.getData(
        filteredEvents,
        currentPage,
        itemsPerPage);

    // On formate les date en 19/09/2019

   
    
    const formatDate = (str) => moment(str).format('DD/MM/YYYY');
    const formatDateTime = (str) => 
        moment(str).format('DD/MM/YYYY') 
        + " à " +
        moment(str).locale('fr').format('LTS');

    return ( <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h5>Liste des {filteredEvents.length} évènements</h5>
                <Link to ="/events/edit/new" className="btn btn-primary">Ajouter un événements</Link>
            </div>
            <div className="form-group">
                <input id="search_bar" type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>

            {!loading && (
            <table className="table table-hover">
                
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom de l'évènement</th>
                        <th className="text-center">Prix</th>
                        <th>Date de création</th>
                        <th>Etat</th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                {paginatedEvents.length ===0 && (
                    <tr>
                        <td>Chargement ...</td>
                    </tr>
                )}
                {paginatedEvents.map(event => 
                    
                        <tr key={event.id}>
                        <td>{event.id}</td>
                        <td><Link to={"/events/edit/" + event.id}>{event.title}</Link></td>
                        <td className="text-center"> {event.price.toLocaleString()} €</td>
                        <td>{formatDateTime(event.createdAt)}</td>
                        <td> En Attente</td>
                        <td>
                            <Link to={"/events/edit/" + event.id} className="btn btn-sm btn-primary" >Editer</Link>
                        </td> 
                        <td>
                            <button disabled className="btn btn-sm btn-success" >Autoriser</button>
                        </td>  
                        <td>
                            <button disabled className="btn btn-sm btn-danger" >Non Autoriser</button>
                        </td>
                        
                    </tr>
                    
                )}
                </tbody> 
            </table>
            )}
            {loading && <ProductDetails />}

        { itemsPerPage < filteredEvents.length && (
        <Pagination 
        currentPage={ currentPage } 
        itemsPerPage={ itemsPerPage } 
        length={ filteredEvents.length } 
        onPageChanged={ handlePageChange } 
        />
        )}
        </>
     );
}
 
export default EventsPage;