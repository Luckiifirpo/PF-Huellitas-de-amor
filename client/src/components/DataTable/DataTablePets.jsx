import React from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { getAllPets } from "../../redux/slices/petsSlice";
import { Link } from "react-router-dom";

import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PutAdoption from "./PutPetsAdoption";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { setUserBusyMode, setUserError } from "../../redux/slices/userSlice";
import ErrorManager from "../../resources/ErrorManager";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 550,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  p: 4,
};



export default function DataTablePets() {

  const columns = [
    {
      field: 'image',
      headerName: 'Imagen',
      width: 70,
      renderCell: (params) => (
        <Avatar src={params.row.image} variant="rounded" />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 300
    },

    {
      field: 'name',
      headerName: 'Nombre',
      width: 100
    },

    {
      field: 'species',
      headerName: 'Especie',
      type: 'singleSelect',
      valueOptions: ['feline', 'female', 'fish', 'rodent', 'equine', 'bovine', 'ovine', 'goat', 'other'],
      width: 100
    },
    {
      field: 'age',
      headerName: 'Edad',
      type: 'number',
      width: 50,
    },
    {
      field: 'ageTime',
      headerName: 'meses / años',
      type: 'singleSelect',
      valueOptions: ['months', 'years'],
      width: 100,
    },
    {
      field: 'weight',
      headerName: 'Peso',
      type: 'number',
      width: 50,
    },
    {
      field: 'size',
      headerName: 'Tamaño',
      type: 'singleSelect',
      valueOptions: ['small', 'medium', 'big'],
      width: 90
    },
    {
      field: 'gender',
      headerName: 'Género',
      type: 'singleSelect',
      valueOptions: ['male', 'female'],
      width: 100
    },
    {
      field: 'breed',
      headerName: 'Raza',
      width: 100
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 300
    },
    {
      field: 'postDate',
      headerName: 'Publicado',
      width: 110,
      type: 'dateTime',

    },
    {
      field: 'IsAdopted',
      headerName: 'Adoptado',
      type: 'boolean',
      width: 90
    },
    {
      field: 'actions',
      headerName: 'Editar',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={< EditIcon />}
          label="Editar"
          // onClick={(e) => {handleOpen( <PutAdoption src={currentPets.id} age={456}/>)}}
          onClick={(e) => { handleOpen(params.id) }}

        // onClick={deleteUser(params.id)}
        />,

      ],
    },

  ];



  // const dispatch = useDispatch()
  // const allPets = useSelector((state)=>state.pets)


  const [tableData, setTableData] = useState([])
  const dispatch = useDispatch();

  const currentPets = useSelector((state) => state.pets.petsList);

  const [data, setData] = useState({})
  const [open, setOpen] = React.useState(false);

  // const dataPets = currentPets.filter((e)=> e.id === params.id)[0]
  const handleOpen = (id) => {
    setOpen(true)
    setData(currentPets.filter((e) => e.id === id)[0])
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    /*fetch("http://localhost:3001/animals")
      .then((data) => data.json())
      .then((data) => {
        setTableData(data)
      })*/

    (async () => {
      try {
        dispatch(setUserBusyMode(true));
        const response = await api.get("/animals");
        setTableData(response.data);
        dispatch(setUserBusyMode(false));
      } catch (error) {
        dispatch(setUserBusyMode(false));
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "GET: http://localhost:3001/animals" }
        ])));
      }
    })();
  }, [])


  //  useEffect(()=>{
  //   dispatch(getAllPets());
  //  },[])

  return (
    <div style={{ height: "calc(100vh - 350px)", width: '100%', marginBottom: "13px" }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
        checkboxSelection
      />

      {open ? <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {/* { console.log(dataPets) */}
          {data.hasOwnProperty("id") && <PutAdoption
            id={data.id}
            age={data.age}
            name={data.name}
            date={data.date}
            species={data.species}
            ageTime={data.ageTime}
            weight={data.weight}
            size={data.size}
            gender={data.gender}
            breed={data.breed}
            description={data.description}
            img={data.img}
            handleClose={handleClose}
          />
          }
        </Box>
      </Modal> : null}
    </div>
  );
}
