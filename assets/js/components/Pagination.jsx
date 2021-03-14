import React from 'react';

// <Pagination currentPage={currentpage} itemsPerPage={itemsPerPage} length={events.length} onPageChanged={handlePageChange} />

const Pagination = ({ currentPage, itemsPerPage, length, onPageChanged }) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for(let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    return ( <div>
        <ul className="pagination pagination-sm">
          <li className={"page-item" + (currentPage === 1 && " disabled")}>
            <button className="page-link" onClick={ () => onPageChanged(currentPage - 1)}>&laquo;</button>
          </li>
          {pages.map(page => (
          <li 
              key={page} 
              className={"page-item" + (currentPage === page && " active")} >
            <button className="page-link" 
                  onClick={() => onPageChanged(page) } >{page}</button>
          </li> ))}
          
          <li className={"page-item" + (currentPage === pagesCount && " disabled")}>
            <button className="page-link" onClick={ () => onPageChanged(currentPage + 1)}>&raquo;</button>
          </li>
        </ul>
      </div> );
}

Pagination.getData = (items, currentPage, itemsPerPage) => {
    //d'ou part (start) pendant combien de (itemsPerPage)
    const start = currentPage * itemsPerPage - itemsPerPage;
    //              3         *     10       -    10    = 20
    return items.slice(start, start + itemsPerPage);
}
 
export default Pagination;