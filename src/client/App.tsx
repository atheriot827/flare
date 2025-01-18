import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-dom';
import { Home } from './views/Home';



export default function App() {
    return (
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
            </Routes>
       </BrowserRouter>
    )
}