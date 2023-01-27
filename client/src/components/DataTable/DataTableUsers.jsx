import React from "react";
import { Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import { getAllPets } from "../../redux/slices/petsSlice";





const columns = [
  { field: 'id',
    headerName: 'ID', 
    width: 70 },
    { field: 'photoURL',
    headerName: 'Avatar',
    renderCell: (params) => <Avatar src={params.row.photoURL} />,
    sortable: false,
    filterable: false,
    width: 60 },

  { field: 'name',
    headerName: 'Nombre',
    width: 100 },

  { field: 'surname',
    headerName: 'Apellido',
     width: 100 },
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
    width: 90,
  },
  { field: 'email',
    headerName: 'Email',
    width: 180 },
  { field: 'work',
    headerName: 'Trabajo',
    type: 'boolean',
    editable: true,
    width: 100 },
    { field: 'password',
    headerName: 'Contraseña',
    width: 100 },
   
    {
      field: 'createdAt',
      headerName: 'Fecha de inicio',
      width: 200,

    },
   
   
  ];
export default function DataTableUsers() {

  // const dispatch = useDispatch()
  // const allPets = useSelector((state)=>state.pets)
  const [tableDataUsers, setTableDataUsers] = useState([])


  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => setTableDataUsers(data))
  }, [])

  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },

  






  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableDataUsers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}