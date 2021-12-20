import React from 'react'
import { Link } from 'react-router-dom'

let getTitle = (bibliography) => {
    let title = bibliography.bibliography_title
    console.log(bibliography)
    return title
}

const ListItemMain = ({ bibliography }) => {
    return (
        <Link to={`/bibliography/${bibliography.id}`}>
            <div className="bibliographies-list-item" >
                <h3>{getTitle(bibliography)}</h3>
            </div>

        </Link>

    )
}

export default ListItemMain
