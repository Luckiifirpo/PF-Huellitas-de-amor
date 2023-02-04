import React from "react";
import { Avatar, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import PutUser from "./PutUser"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { setUserBusyMode } from "../../redux/slices/userSlice";
import api from "../../services/api";
import AdoptionRequestForm from "../../pages/AdoptionRequestForm/AdoptionRequestForm";

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
    {
      field: 'photoURL',
      headerName: 'Avatar',
      renderCell: (params) => <Avatar src={params.row.photoURL} />,
      sortable: false,
      filterable: false,
      width: 60
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 300
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150
    },

    {
      field: 'surname',
      headerName: 'Apellido',
      width: 150
    },
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
    {
      field: 'email',
      headerName: 'Email',
      width: 220
    },
    {
      field: 'hasAJob',
      headerName: 'Trabajo',
      type: 'boolean',
      editable: true,
      width: 100
    },
    {
      field: 'occupation',
      headerName: 'Ocupación',
      width: 100
    },
    {
      field: 'federatedUID',
      headerName: 'ID Federada',
      width: 250
    },
    {
      field: 'reset',
      headerName: 'Reinicio',
      width: 100
    },
    {
      field: 'password',
      headerName: 'Contraseña',
      width: 400
    },

    {
      field: 'createdAt',
      headerName: 'Fecha de inicio',
      width: 200,
    },
    {
      field: 'adoptionRequestId',
      headerName: 'ID Solicitud de adopcion',
      width: 250
    },
    {
      field: 'showAdoptionRequest',
      headerName: 'Mostrar solicitud de adopcion',
      type: 'actions',
      width: 250,
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={params.row.adoptionRequestId ? <VisibilityIcon /> : <BlockIcon />}
            label="Mostrar solicitud de adopcion"
            onClick={params.row.adoptionRequestId ? (e) => openAdoptionRequestForm(params.row.adoptionRequestId) : null}
          />
        ]
      }
    },
    {
      field: 'edit',
      headerName: 'Editar',
      type: 'actions',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={< EditIcon />}
          label="Editar"
          onClick={(e) => { handleOpenUser(params.id) }}
        />,

      ],
    },


  ];


  // const dispatch = useDispatch()
  // const allPets = useSelector((state)=>state.pets)
  const [tableDataUsers, setTableDataUsers] = useState([])
  const [dataUser, setDataUser] = useState(null);
  const [adoptionRequestFormData, setAdoptionRequestFormData] = useState(null);
  const [openUser, setOpenUser] = React.useState(false);
  const currentPets = useSelector((state) => state.pets.petsList);
  const dispatch = useDispatch();

  const handleOpenUser = (id) => {
    setOpenUser(true)
    // setDataUser(currentUser.filter((e)=> e.id === id)[0]);
    const userToEdit = tableDataUsers.filter((e) => {
      return e.id === id;
    })[0];

    if (userToEdit) {
      setDataUser(userToEdit);
    }
  }

  const openAdoptionRequestForm = async (adoptionRequestId) => {
    try {
      dispatch(setUserBusyMode(true));
      const response = await api.get("/adoption_request/" + adoptionRequestId);
      const { applicantId, toBeAdoptedId, ...restAdoptionRequest } = response.data;
      const adoptionRequest = {
        ...restAdoptionRequest,
        user_id: applicantId,
        pet_id: toBeAdoptedId,
        psychologicalData: restAdoptionRequest.applicantsPsychologicalData,
        applicantsResidences: restAdoptionRequest.applicantsResidence,
        personalReferences: restAdoptionRequest.personalReference,
        residencesTenants: restAdoptionRequest.residencesTenant.map((e) => {
          const {tenantPsychologicalData, ...rest} = e;
          return {
            ...e,
            psychologicalData: tenantPsychologicalData
          }
        }),
        previousPets: restAdoptionRequest.previousPet.map((e) => {
          const {previousPetVaccine, ...rest} = e;
          return {
            ...e,
            vaccines: previousPetVaccine
          }
        })
      }

      const petData = currentPets.filter(e => {
        return e.id === toBeAdoptedId
      })[0];

      console.log(adoptionRequest);

      const newAdoptionRequestFormData = {
        petData,
        adoptionRequest
      }

      setAdoptionRequestFormData(newAdoptionRequestFormData);
      dispatch(setUserBusyMode(false));
    } catch (error) {
      dispatch(setUserBusyMode(false));
    }
  }

  const handleClose = () => {
    setOpenUser(false);
    setDataUser(null);
    setAdoptionRequestFormData(null);
  };

  const UpdateTableDataUsers = (data) => {
    const usersData = data.map(e => {
      const { adoptionRequest, ...userData } = {
        ...e,
        adoptionRequestId: e.adoptionRequest ? e.adoptionRequest.id : null
      }

      return userData;
    });

    setTableDataUsers(usersData);

  }

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => {
        UpdateTableDataUsers(data);
        dispatch(setUserBusyMode(false));
      })
  }, [])

  const UpdatedUserInfo = () => {
    setOpenUser(false);
    setDataUser(null);
    setAdoptionRequestFormData(null);

    fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => UpdateTableDataUsers(data));
    dispatch(setUserBusyMode(false));
  }

  useEffect(() => {

  }, [dataUser]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={tableDataUsers}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />

      {
        dataUser ?
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

              <PutUser data={dataUser} UpdatedUserInfo={UpdatedUserInfo} />
            </Box>
          </Modal>
          :
          null
      }
      {
        adoptionRequestFormData ?
          <Modal
            keepMounted
            open={adoptionRequestFormData}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description">
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <Paper sx={{width: "calc(100vw - 100px)", height: "calc(100vh - 100px)", marginTop: "50px", overflow: "auto"}}>
                <AdoptionRequestForm data={adoptionRequestFormData} adminMode={true} UpdatedUserInfo={UpdatedUserInfo}/>
              </Paper>
            </Box>
          </Modal>
          :
          null
      }
    </div>
  );
}