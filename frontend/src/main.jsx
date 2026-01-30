import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Calculators from './pages/Calculators.jsx'

import Recipes from './pages/Recipes.jsx'
import About from './pages/About.jsx'

import "@styles/global.scss";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/calculadoras" element={<Calculators />} />

                <Route path="/recetas" element={<Recipes />} />
                <Route path="/nosotros" element={<About />} />
            </Route>
        </Routes>
    </BrowserRouter>,
)
