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
import FirebaseApp from "../services/firebaseApp";
import { getAuth } from "firebase/auth";
import { federatedLogin, resetCurrentUser, setCurrentUser } from "../redux/slices/userSlice";
import api from "../services/api";
import { setError } from "../redux/slices/errorsSlice";
import ErrorManager from "../resources/ErrorManager";
import { tryStartingFavoritesInLocalStorage } from "../redux/slices/adoptionSlice";
import UserInfoEditor from "../pages/UserInfoEditor/UserInfoEditor";
import MessageInfoDialog from "../components/Dialogs/InfoDialog/MessageInfoDialog";
import BusyModeCircularProgressIndicator from "../components/Dialogs/BusyModeCircularProgressIndicator/BusyModeCircularProgressIndicator";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const auth = getAuth(FirebaseApp);

    if (auth.currentUser) {
      auth.currentUser.getIdToken(true).then((idToken) => {
        dispatch(federatedLogin(idToken, auth.currentUser));
      })
    } else if (sessionStorage["user-id"]) {
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
    } else {
      dispatch(resetCurrentUser());
    }

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-info-editor" element={<UserInfoEditor />} />
        </Route>
        <Route path="/pet_info/:pet_id" element={<PetInfoCard />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro-usuario" element={<SignUp />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
      <ErrorDialog />
      <MessageInfoDialog />
      <BusyModeCircularProgressIndicator />
    </BrowserRouter>
  )
}

export default App
