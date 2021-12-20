import React, { useState, useEffect } from 'react'
import ListItemMain from '../components/ListItemMain'
import AddButtonMain from '../components/AddButtonMain'


const BibliographiesListPage = () => {

    let [bibliographies, setBibliographies] = useState([])

    useEffect(() => {
        getBibliographies()
    }, [])

    let getBibliographies = async () => {
        console.log(localStorage.getItem('token'))
        let response = await fetch('http://localhost:8000/api/bibliographies/',{
          method: 'GET',
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }

        })

        //attach token that was in Dashboard
        // in the view, grab the request and token within the request and
        // auth library, auth object token == request token
        console.log(response)
        let data = await response.json()
        setBibliographies(data)
    }

    return (
        <div className="bibliographies">
            <div className="bibliographies-list">
                {bibliographies.map((bibliography, index) => (
                    <ListItemMain key={index} bibliography={bibliography} />
                ))}
            </div>
            <AddButtonMain />
        </div>
    )
}

export default BibliographiesListPage
