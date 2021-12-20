import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as AddIcon } from '../assets/add.svg'


const AddButtonMain = () => {
    return (
        <Link to="/bibliography/new" className="floating-button">
            <AddIcon />
        </Link>
    )
}

export default AddButtonMain
