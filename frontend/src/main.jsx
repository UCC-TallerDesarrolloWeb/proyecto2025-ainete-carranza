import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Calculators from './pages/Calculators.jsx'
import Habits from './pages/Habits.jsx'
import Recipes from './pages/Recipes.jsx'
import About from './pages/About.jsx'
import Thanks from './pages/Thanks.jsx'
import "@styles/global.scss";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/calculadoras" element={<Calculators />} />
                <Route path="/habitos" element={<Habits />} />
                <Route path="/recetas" element={<Recipes />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/gracias" element={<Thanks />} />
            </Route>
        </Routes>
    </BrowserRouter>,
)
