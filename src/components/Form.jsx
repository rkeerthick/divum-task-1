
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Form() {
    const navigate = useNavigate();
    const handleSubmit = (event)=> {
        event.preventDefault()
        navigate(-1)
    }
  return (
    <div>
        <nav>
        <img className='logo' src="./Divum_Logo.png" alt="Logo" />
            <button onClick={() => navigate(-1)}  className='add-btn px-18'>Tables</button>
        </nav>
        <form action="">
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <div>
                <label htmlFor="name">Name : </label>
                <input type="text" name="name"/>
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default Form