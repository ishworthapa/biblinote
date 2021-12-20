import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'

const BibliographyPage = ({ match, history }) => {

    let bibliographyId = match.params.id
    let [bibliography, setBibliography] = useState(null)
    let [source,type,title] = useState(null)
    useEffect(() => {
        getBibliography()
    }, [bibliographyId])


    let getBibliography = async () => {
        if (bibliographyId === 'new') return

        let response = await fetch(`http://127.0.0.1:8000/api/bibliography/${bibliographyId}`,
          {
            method: 'GET',
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        })
        let data = await response.json()
        setBibliography(data)
    }

    let createBibliography = async () => {
      console.log('create:', bibliography)

        fetch(`http://127.0.0.1:8000/api/bibliographies/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(bibliography)
        })
    }


    let updateBibliography = async () => {
        fetch(`http://127.0.0.1:8000/api/bibliography/${bibliographyId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(bibliography)
        })
    }


    let deleteBibliography = async () => {
        fetch(`http://127.0.0.1:8000/api/bibliography/${bibliographyId}`, {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        })
        history.push('/')
    }

    let handleSubmit = (value) => {
        if (bibliographyId !== 'new') {
            updateBibliography()
        } else if (bibliographyId === 'new') {
            createBibliography()
        }
        history.push('/')
    }

    let handleInputChange= (event) => {
      const target = event.target;
      const name = target.name;
      if (target.name === 'bibliography_type') {
        type = target.value
      } else if (target.name === 'bibliography_source') {
        source = target.value
      } else if (target.name === 'bibliography_title') {
        title = target.value
      }
      bibliography = {"bibliography_title":title,"bibliography_source":source,"bibliography_type":type,}
    }

    return (
      <div>
      <h3>
          <ArrowLeft onClick={handleSubmit} />
          <div>
          {bibliographyId !== 'new' ? (
              <button onClick={deleteBibliography}>Delete</button>
          ) : (
              <button onClick={handleSubmit}>Save</button>
          )}

          </div>
      </h3>

        <label>
          Bibliography Title:
          <input
            name="bibliography_title" type="text" length="500"
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bibliography Source:
          <textarea rows="20" cols="50"
            name="bibliography_source"
            onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Bibliography Type:
          <select
            name="bibliography_type"
            onChange={handleInputChange} >
            <option value="RA" selected>Research Article</option>
            <option value="WA">Web Article</option>
            <option value="AV">Audio/Video</option>
            </select>
        </label>

      </div>

    );

}

export default BibliographyPage
