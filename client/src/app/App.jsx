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
import Error404 from "../pages/Error404/Error404"
import PetInfoCard from "../pages/PetInfoCard/PetInfoCard";
import { useEffect } from "react";
import { getAllPets } from "../redux/slices/petsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {

  const petsState = useSelector((state) => state.pets);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPets());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<AboutUs />} />
          <Route path="/adopciones" element={<Adoptions />} />
          <Route path="/donaciones" element={<Donations />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/dar-en-adopcion" element={<PostAdoption />} />
        </Route>
        <Route path="/pet_info/:pet_id" element={<PetInfoCard />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro-usuario" element={<SignUp />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
