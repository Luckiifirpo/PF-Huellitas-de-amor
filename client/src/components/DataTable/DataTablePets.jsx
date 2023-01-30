import React from "react";
import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid';
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import { getAllPets } from "../../redux/slices/petsSlice";

import EditIcon from '@mui/icons-material/Edit';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PutPetsAdoption from "./PutPetsAdoption";

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
  { field: 'image',
  headerName: 'Imagen',
  width: 70,
  renderCell: (params) => (
    <Avatar src={params.row.image} variant="rounded" />
  ),
  sortable: false,
  filterable: false,
},
  { field: 'id',
    headerName: 'ID', 
    width: 300 },

  { field: 'name',
    headerName: 'Nombre',
    width: 100 },

  { field: 'species',
    headerName: 'Especie',
    type: 'singleSelect',
    valueOptions: ['feline', 'female', 'fish',  'rodent','equine', 'bovine', 'ovine', 'goat','other'],
     width: 100 },
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
  { field: 'size',
    headerName: 'Tamaño',
    type: 'singleSelect',
    valueOptions: ['small', 'medium', 'big'],
    width: 90 
  },
  { field: 'gender',
    headerName: 'Género',
    type: 'singleSelect',
    valueOptions: ['male', 'female'],
    width: 100 
  },
    { field: 'breed',
    headerName: 'Raza',
    width:100 
  },
    { field: 'description',
    headerName: 'Descripción',
    width: 300 
  },
  {
    field: 'postDate',
    headerName: 'Publicado',
    width: 110, 
    type: 'dateTime',

    },
    { field: 'IsAdopted',
    headerName: 'Adoptado',
    type: 'boolean',
    width: 90 },
    {
      field: 'actions',
      headerName: 'Editar',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={< EditIcon />}
          label="Editar"
          onClick={(e) => {handleOpen( <PutPetsAdoption src={params.row}/>)}}
          // onClick={deleteUser(params.id)}
        />,
        
      ],
    },
   
  ];



  // const dispatch = useDispatch()
  // const allPets = useSelector((state)=>state.pets)
  const [tableData, setTableData] = useState([])

  const [modalEditar, setModalEditar]= useState(false);


  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) =>{
    setOpen(true)
    console.log(id)
  } 
  const handleClose = () => setOpen(false);




  useEffect(() => {
    fetch("http://localhost:3001/animals")
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])


  //  useEffect(()=>{
  //   dispatch(getAllPets());
  //  },[])

 


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
           <PutPetsAdoption/> 
        </Box>
      </Modal>
    </div>
  );
}
