import React, { useState, useEffect, Fragment } from 'react';
import {
  HashRouter as Router,
  Route
} from "react-router-dom";


import './App.css';
import HeaderMain from './components/HeaderMain'
import BibliographiesListPage from './pages/BibliographiesListPage'
import BibliographyPage from './pages/BibliographyPage'
import PDFNotes from './PDFNotes'


const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (localStorage.getItem('token') === null) {
        window.location.replace('http://localhost:3000/login');
      } else {
        fetch('http://localhost:8000/rest-auth/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setUsername(data.username);
            setLoading(false);
          });
      }
    }, []);

    return (
      <Router>
    <div className="dcontainer dark">
      <div className="app">
        <HeaderMain />
        <Route path="/" exact component={BibliographiesListPage} />
        <Route path="/bibliography/:id" component={PDFNotes} />

      </div>
    </div>
    </Router>
  );
};

export default Dashboard;
