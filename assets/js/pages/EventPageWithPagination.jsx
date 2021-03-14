import React, {useEffect, useState} from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';

const EventPageWithPagination = (props) => {
    const [events, setEvents] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 15;

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/events?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response =>{
             setEvents(response.data["hydra:member"]);
             setTotalItems(response.data["hydra:totalItems"]);
            })
        .catch(error => console.log(error.response));
    }, [currentPage])

    const handlePageChange = (page => {
        setEvents([]);
        setCurrentPage(page);
    })

    const handleSearch = searchEvent => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    }

    const filteredEvents = events.filter(
        e => 
        e.title.toLowerCase().includes(search.toLowerCase())
        );

    const paginatedEvents = Pagination.getData(
        filteredEvents,
        currentPage,
        itemsPerPage);

    return ( <>
            <h1 className="display-3">Liste des {totalItems} évènements</h1>
            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher ..."/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom de l'évènement</th>
                        <th>Prix</th>
                        <th>Date de création</th>
                        <th>Etat</th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </thead>
                <tbody>
                {events.length ===0 && (
                    <tr>
                        <td>Chargement ...</td>
                    </tr>
                )}
                {events.map(event => <tr key={event.id}>
                        <td>{event.id}</td>
                        <td>{event.title}</td>
                        <td>{event.price.toLocaleString()} €</td>
                        <td>{event.createdAt}</td>
                        <td> En Attente</td>
                        <td>
                            <button disabled className="btn btn-sm btn-success" >Autoriser</button>
                        </td>  
                        <td>
                            <button disabled className="btn btn-sm btn-danger" >Non Autoriser</button>
                        </td>
                        
                    </tr>)}
                    
                </tbody>
            </table>

        { itemsPerPage < totalItems && (
        <Pagination 
        currentPage={ currentPage } 
        itemsPerPage={ itemsPerPage } 
        length={ totalItems } 
        onPageChanged={ handlePageChange } 
        />
        )}
        </>
     );
}
 
export default EventPageWithPagination;