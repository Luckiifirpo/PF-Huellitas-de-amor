import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import { getAllPets, setPetsBusyMode } from "../../redux/slices/petsSlice";





const columns = [
  { field: 'id',
    headerName: 'ID', 
    width: 70 },

  { field: 'name',
    headerName: 'Nombre',
    width: 100 },

  { field: 'species',
    headerName: 'Especie',
     width: 100 },
  {
    field: 'age',
    headerName: 'Edad',
    type: 'number',
    width: 50,
  },
  {
    field: 'weight',
    headerName: 'Peso',
    type: 'number',
    width: 50,
  },
  { field: 'size',
    headerName: 'Tamaño',
    width: 90 },
  { field: 'gender',
    headerName: 'Género',
    type: 'singleSelect',
    valueOptions: ['male', 'female'],
    width: 100 },
    { field: 'breed',
    headerName: 'Raza',
    width:100 },
    { field: 'description',
    headerName: 'Descripción',
    width: 100 },
    { field: 'image',
    headerName: 'Imagen',
    width: 100 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,

    },
    { field: 'IsAdopted',
    headerName: 'Adoptado',
    type: 'boolean',
    editable: true,
    width: 90 },
   
  ];
export default function DataTable() {

  const dispatch = useDispatch()
  const allPets = useSelector((state)=>state.pets)
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    /*fetch("http://localhost:3001/animals")
      .then((data) => data.json())
      .then((data) => setTableData(data))*/

      (async () => {
        try {
          dispatch(setPetsBusyMode(true));
          const response = await api.get("/animals");
          UpdateTableDataUsers(response.data);
          dispatch(setPetsBusyMode(false));
        } catch (error) {
          dispatch(setPetsBusyMode(false));
          dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
            { code: error.code },
            { request: "GET: http://localhost:3001/animals" }
          ])));
        }
      })();
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

  




// const rows = [
// {
//   id: "1",
//     date: "1-Jan-2023",
//     species: "Dog",
//     name: "Rex",
//     age: 2,
//     weight: 25,
//     size: "Big",
//     gender: "Male",
//     breed: "Cacri",
//     description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto sit fugiat",
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZJlbDtw4byJKcug1ME7qlpG1jet3tHg1zA&usqp=CAU"},
//     {
//       id: "2",
//       date: "6-Jan-2023",
//       species: "Dog",
//       name: "princess",
//       age: 8,
//       weight: 10,
//       size: "medium",
//       gender: "female",
//       breed: "Spaniel",
//       description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto sit fugiat",
//       img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiEwsd1j4JLO9RoDf1e5DJOyRzJ6MHHC-sHpoD-i0DFjiQER8KvxTD7ZAbAQiKnOEpB4c&usqp=CAU"
//     },



  // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  // { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  // { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  // { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  // { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  // { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  // { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  // { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  // { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },


//];





  

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
    </div>
  );
}
