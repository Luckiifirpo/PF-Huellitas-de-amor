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
import Dashboard from "../pages/Dashboard/Dashboard"
import PetInfoCard from "../pages/PetInfoCard/PetInfoCard";
import { useEffect } from "react";
import { getAllPets } from "../redux/slices/petsSlice";
import { useDispatch } from "react-redux";
import ErrorDialog from "../components/Dialogs/ErrorDialog/ErrorDialog";
import Favorite from "../pages/Favorites/Favorites";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { federatedLogin, resetCurrentUser, setCurrentUser, setLoginType, signOut } from "../redux/slices/userSlice";
import api from "../services/api";
import { setError } from "../redux/slices/errorsSlice";
import ErrorManager from "../resources/ErrorManager";
import { tryStartingFavoritesInLocalStorage } from "../redux/slices/adoptionSlice";
import Stripe from "../pages/Stripe/Stripe";
import Completion from "../pages/Stripe/Completion";
import UserInfoEditor from "../pages/UserInfoEditor/UserInfoEditor";
import MessageInfoDialog from "../components/Dialogs/InfoDialog/MessageInfoDialog";
import BusyModeCircularProgressIndicator from "../components/Dialogs/BusyModeCircularProgressIndicator/BusyModeCircularProgressIndicator";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import AdoptionRequestForm from "../pages/AdoptionRequestForm/AdoptionRequestForm";
import CambioContraseña from "../components/CambioContraseña/CambiarContraseña";
import PutAdoption from "../components/DataTable/PutPetsAdoption";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken(true).then((idToken) => {
          dispatch(federatedLogin(idToken, user));
        })
      } else if (sessionStorage["user-id"]) {
        const user_id = sessionStorage["user-id"];
        const fetchData = async () => {
          try {
            const response = await api.get("/users/" + user_id);
            dispatch(setCurrentUser(response.data));
            dispatch(setLoginType("withEmailAndPassword"));
          } catch (error) {
            dispatch(signOut());
            dispatch(setError(ErrorManager.CreateErrorInfoObject(error, [
              { code: error.code },
              { request: "GET: http://localhost:3001/users/:user_id" }
            ])))
          }
        }
        fetchData();
      } else {
        dispatch(signOut());
      }
    });

    const db = getDatabase();
    const starCountRef = ref(db, 'changeId');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(getAllPets());
    });

    /*else if (sessionStorage["user-id"]) {
      const user_id = sessionStorage["user-id"];
      const fetchData = async () => {
        try {
          const response = await api.get("/users/" + user_id);
          dispatch(setCurrentUser(response.data));
        } catch (error) {
          dispatch(setError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "GET: http://localhost:3001/users/:user_id" }
          ])))
        }
      }
      fetchData();
    } */

    dispatch(getAllPets());
    dispatch(tryStartingFavoritesInLocalStorage());
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
          <Route path="/favoritos" element={<Favorite />} />
          <Route path="/stripe" element={<Stripe />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-info-editor" element={<UserInfoEditor />} />
          <Route path="/adoption-request/:pet_id" element={<AdoptionRequestForm />} />
          <Route path="/cambio-contraseña" element={<CambioContraseña />} />
        </Route>
        <Route path="/gracias-por-tu-donacion" element={<Completion />} />
        <Route path="/pet_info/:pet_id" element={<PetInfoCard />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro-usuario" element={<SignUp />} />
        <Route path="/restore-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <ErrorDialog />
      <MessageInfoDialog />
      <BusyModeCircularProgressIndicator />
    </BrowserRouter>
  )
}

export default App
