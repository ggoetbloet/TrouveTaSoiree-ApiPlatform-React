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
            <div className="containt">

                {paginatedEvents.length ===0 && (
                    <div>
                        <p>Chargement ...</p>
                    </div>
                )}
                {paginatedEvents.map(event => 
                    
                    <div key={event.id} className="card border-light mb-3">
                        <div className="card-header"><small className="text-muted">Du {formatDateTime(event.createdAt)} au {formatDateTime(event.createdAt)}</small></div>
                        <div className="card-body">
                            <h4 className="card-title"><Link to={"/events/edit/" + event.id}>{event.title}</Link></h4>
                        <p> {event.price.toLocaleString()} €</p>
                        <p> En Attente</p>
                        <p>
                            <Link to={"/events/edit/" + event.id} className="btn btn-sm btn-primary" >Editer</Link>
                            <button disabled className="btn btn-sm btn-success" >Autoriser</button>
                            <button disabled className="btn btn-sm btn-danger" >Non Autoriser</button>
                        </p>
                        </div>
                    </div>
                    
                )}
                
            </div>
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