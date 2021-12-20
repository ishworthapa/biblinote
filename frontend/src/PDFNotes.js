import React, { useState, useEffect } from 'react'
import { ReactComponent as ArrowLeft } from './assets/arrow-left.svg'
import { Link } from 'react-router-dom'
import ListItem from './components/ListItem'
import AddButton from './components/AddButton'
import './App.css';

import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import { Document, Page } from 'react-pdf';
import samplePDF from './assets/funset.pdf';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFNotes = ({ match, history }) => {
    var escapeHtml = require('escape-html')
    let bibliographyId = match.params.id
    let [bibliography, setBibliography] = useState(null)
    let [source,type,title] = useState(null)
    let [notes, setNotes] = useState([])

    useEffect(() => {
        getBibliography()
        fetch(`http://localhost:8000/api/notes/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${localStorage.getItem('token')}`
            }
          })
            .then(res => res.json())
            .then(data => {
              setNotes(data);
            });
    }, [bibliographyId])



    let getBibliography = async () => {
        if (bibliographyId === 'new') return

        let response = await fetch(`http://localhost:8000/api/bibliography/${bibliographyId}`,
          {
            method: 'GET',
            headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        })
        let data = await response.json()
        //getNotes()
        setBibliography(data)
    }

    let createBibliography = async () => {
      console.log('create:', bibliography)

        fetch(`http://localhost:8000/api/bibliographies/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(bibliography)
        })
    }


    let updateBibliography = async () => {
        fetch(`http://localhost:8000/api/bibliography/${bibliographyId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            },
            body: JSON.stringify(bibliography)
        })
    }


    let deleteBibliography = async () => {
        fetch(`http://localhost:8000/api/bibliography/${bibliographyId}`, {
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

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }
    function changePage(offset) {
      setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
      changePage(-1);
    }

    function nextPage() {
      changePage(1);
    }


    return (
      <div className="bibliographies-title">
        <ArrowLeft className="filter-green" onClick={handleSubmit} />


          {bibliographyId !== 'new' ? (
            <div className="app-pdf">
              <div>
              <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                Next
              </button>
              <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                Previous
              </button>
                <button onClick={deleteBibliography}>Delete</button>
              <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess} >
              <Page pageNumber={pageNumber} />
              </Document>
              </div>

              <div className="notes-body">
              <h2 className="notes-title">Notes</h2>
              {notes.map((note, index) => (<ListItem key={index} note={note} />))}
              <AddButton />
              </div>

            </div>

          ) : (

        <div className="app-form">
        <label for="bibliography_source">
          Bibliography Source :
          <textarea rows="18" cols="50"
            name="bibliography_source"
            onChange={handleInputChange} />
        </label>
        <br />
        <label for="bibliography_title">
          Bibliography Title :
          <textarea
            name="bibliography_title" rows="2" cols="50"
            onChange={handleInputChange} />
        </label>
        <br />
        <label for="bibliography_type">
          Bibliography Type : </label>
          <select
            name="bibliography_type"
            onChange={handleInputChange} >
            <option value="" disabled selected>Select your option</option>
            <option value="RA" >Research Article</option>
            <option value="WA">Web Article</option>
            <option value="AV">Audio/Video</option>
            </select>


        <button onClick={handleSubmit}>Save</button>




        </div>
        )}
      </div>

    );

}

export default PDFNotes
