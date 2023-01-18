import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Adoptions from "../pages/Adoptions"
import AboutUs from "../pages/AboutUs"
import Donations from "../pages/Donations"
import Contact from "../pages/Contact"
import LayoutMain from "../layout/LayoutMain";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<LayoutMain/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/quienes-somos" element={<AboutUs/>}/>
          <Route path="/adopciones" element={<Adoptions/>}/>
          <Route path="/donaciones" element={<Donations/>}/>
          <Route path="/contacto" element={<Contact/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
