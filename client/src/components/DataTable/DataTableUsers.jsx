import React from "react";
import { Avatar } from '@mui/material';
import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import PutUser from "./PutUser"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  p: 4,
};


export default function DataTableUsers() {

const columns = [
  { field: 'photoURL',
    headerName: 'Avatar',
    renderCell: (params) => <Avatar src={params.row.photoURL} />,
    sortable: false,
    filterable: false,
    width: 60 },
  { field: 'id',
    headerName: 'ID', 
    width: 300 },
  { field: 'name',
    headerName: 'Nombre',
    width: 150 },

  { field: 'surname',
    headerName: 'Apellido',
     width: 150 },
  {
    field: 'age',
    headerName: 'Edad',
    type: 'number',
    width: 50,
  },
  {
    field: 'direction',
    headerName: 'Dirección',
    type: 'number',
    width: 120,
  },
  { field: 'email',
    headerName: 'Email',
    width: 220 },
  { field: 'hasAJob',
    headerName: 'Trabajo',
    type: 'boolean',
    editable: true,
    width: 100 },
    { field: 'occupation',
    headerName: 'Ocupación',
    width: 100 },
    {
    field:'federatedUID',
    headerName: 'Identificación Federal',
    width: 250
    },
    {
      field:'reset',
      headerName: 'Reinicio',
      width: 100
      },
    { field: 'password',
    headerName: 'Contraseña',
    width: 500 },  
   
    {
    field: 'createdAt',
    headerName: 'Fecha de inicio',
    width: 200,
    },
    { field: 'hasAdoptionRequest',
    headerName: 'Adopto?',
    type: 'boolean',
    editable: true
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
          onClick={(e) => {handleOpenUser(params.id)}}
        />,
        
      ],
    },
   
   
  ];


  // const dispatch = useDispatch()
  // const allPets = useSelector((state)=>state.pets)
  const [tableDataUsers, setTableDataUsers] = useState([])
  const [dataUser, setDataUser] = useState({})
  const [openUser, setOpenUser] = React.useState(false);
  const currentUser = useSelector((state) => state.users);



  const handleOpenUser= (id) =>{
    setOpenUser(true)
    // setDataUser(currentUser.filter((e)=> e.id === id)[0])
    
  
    console.log(currentUser)
  
   } 
   const handleClose = () => setOpenUser(false);
 

   useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => setTableDataUsers(data))
  }, [])
  






  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableDataUsers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

<Modal
        keepMounted
        open={openUser}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {/* { console.log(dataPets) */}
           {/* { dataUser.hasOwnProperty("id") && <PutUser  
            age={dataUser.age} 
            name={dataUser.name} 
            surname={dataUser.surname}
            direction={dataUser.direction}
            email={dataUser.email}
            hasAJob={dataUser.hasAJob}
            occupation={dataUser.occupation}
            password={dataUser.password}
            federatedUID={dataUser.federatedUID}
            photoURL={dataUser.photoURL}
            reset={dataUser.reset}
            hasAdoptionRequest={dataUser.hasAdoptionRequest}
           /> 
          
          
          } */}

          <PutUser/>


           
  
        </Box>
      </Modal>


    </div>
  );
}