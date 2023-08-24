
import React from 'react'
import DisplayTable from './DisplayTable'
import Form from './Form'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<DisplayTable/>}>
                <Route path='/' element={<DisplayTable/>}></Route>
            </Route>
            <Route exact path='/form' element={<Form />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Routing