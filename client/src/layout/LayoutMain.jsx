import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { useEffect } from "react";
import { getAllPets } from "../redux/slices/petsSlice";
import { useDispatch, useSelector } from "react-redux";

const LayoutMain = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default LayoutMain