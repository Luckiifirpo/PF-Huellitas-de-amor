import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home"
import Adoptions from "../pages/Adoptions/Adoptions"
import AboutUs from "../pages/AboutUs/AboutUs"
import Donations from "../pages/Donations/Donations"
import Contact from "../pages/Contact/Contact"
import PostAdoption from "../components/PostAdoption/PostAdoption"
import LayoutMain from "../layout/LayoutMain";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

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
          <Route path="/dar-en-adopcion" element={<PostAdoption/>}/>
          <Route path="/iniciar-sesion" element={<Login/>}/>
          <Route path="/registro-usuario" element={<SignUp/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
