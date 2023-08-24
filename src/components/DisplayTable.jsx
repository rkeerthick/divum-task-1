

import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function DisplayTable() {
    const navigate = useNavigate()
  return (
    <div>
        <nav>
            <img className='logo' src="./Divum_Logo.png" alt="Logo" />
            <button onClick={() => navigate("/form")}  className='add-btn px-18'>Add + </button>
        </nav>
    </div>
  )
}

export default DisplayTable