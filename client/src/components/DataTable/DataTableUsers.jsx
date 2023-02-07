import React, { useRef } from "react";
import { Avatar, Button, Paper } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import PutUser from "./PutUser"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { setUserError, setUserMessage, setUserBusyMode } from "../../redux/slices/userSlice";
import api from "../../services/api";
import AdoptionRequestForm from "../../pages/AdoptionRequestForm/AdoptionRequestForm";
import EmailEditor from 'react-email-editor';

import requestDataReviewEmailTemplate from "./EmailTemplates/RequestDataReview.json";
import rejectedAdoptionRequestEmailTemplate from "./EmailTemplates/RejectedAdoptionRequest.json";

import ErrorManager from "../../resources/ErrorManager";

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
            onClick={params.row.adoptionRequestId ? (e) => openAdoptionRequestForm(params.row.adoptionRequestId, { name: params.row.name, surname: params.row.surname }, params.row.id) : null}
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
  const [richTextEditorState, setRichTextEditorState] = useState({
    data: null,
    visible: false,
    type: null
  });
  const currentPets = useSelector((state) => state.pets.petsList);
  const dispatch = useDispatch();

  const emailEditorRef = useRef(null);

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

  const openAdoptionRequestForm = async (adoptionRequestId, userName, userId) => {
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
          const { tenantPsychologicalData, ...rest } = e;
          return {
            ...e,
            psychologicalData: tenantPsychologicalData
          }
        }),
        previousPets: restAdoptionRequest.previousPet.map((e) => {
          const { previousPetVaccine, ...rest } = e;
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
        adoptionRequest,
        userData: {
          ...userName,
          id: userId
        }
      }

      setAdoptionRequestFormData(newAdoptionRequestFormData);
      dispatch(setUserBusyMode(false));
    } catch (error) {
      dispatch(setUserBusyMode(false));
    }
  }

  const handleClose = () => {
    hideModals();
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

  const RequestDataReview = (data) => {
    hideModals();

    setRichTextEditorState({
      data,
      visible: true,
      type: "requestDataReview"
    });
  }

  const RejectAdoptionRequest = (data) => {
    hideModals();

    setRichTextEditorState({
      data,
      visible: true,
      type: "rejectAdoptionRequest"
    });
  }

  const onReadyEmailEditor = () => {
    if (richTextEditorState.type === "requestDataReview") {
      let strJSON = JSON.stringify(requestDataReviewEmailTemplate);
      strJSON = strJSON.replace("{pet_image}", richTextEditorState.data.petData.img);
      strJSON = strJSON.replaceAll("{pet_name}", richTextEditorState.data.petData.name);
      strJSON = strJSON.replaceAll("{user_name}", richTextEditorState.data.userData.name);
      emailEditorRef.current.editor.loadDesign(JSON.parse(strJSON));
    } else if (richTextEditorState.type === "rejectAdoptionRequest") {
      let strJSON = JSON.stringify(rejectedAdoptionRequestEmailTemplate);
      strJSON = strJSON.replace("{pet_image}", richTextEditorState.data.petData.img);
      strJSON = strJSON.replaceAll("{pet_name}", richTextEditorState.data.petData.name);
      strJSON = strJSON.replaceAll("{user_name}", richTextEditorState.data.userData.name);
      emailEditorRef.current.editor.loadDesign(JSON.parse(strJSON));
    }
  }
  const UpdatedUserInfo = () => {
    hideModals();
    /*fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => UpdateTableDataUsers(data));
    dispatch(setUserBusyMode(false));*/

    (async () => {
      try {
        dispatch(setUserBusyMode(true));
        const response = await api.get("/users");
        UpdateTableDataUsers(response.data);
        dispatch(setUserBusyMode(false));
      } catch (error) {
        dispatch(setUserBusyMode(false));
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "GET: http://localhost:3001/users" }
        ])));
      }
    })();
  }

  const hideModals = () => {
    setOpenUser(false);
    setDataUser(null);
    setAdoptionRequestFormData(null);
    setRichTextEditorState({
      data: null,
      visible: false,
      type: null
    });
  }

  const saveDesign = () => {
    emailEditorRef.current.editor.saveDesign(design => {
      console.log('saveDesign', JSON.stringify(design))
    })
  }

  const SendRequestDataReviewEmail = () => {
    emailEditorRef.current.editor.exportHtml(async data => {
      try {
        const { html } = data
        const userId = richTextEditorState.data.userData.id;
        hideModals();

        dispatch(setUserBusyMode(true));
        const response = await api.post("/adoption_request/send_request_data_review_email", {
          userId,
          emailHTML: html
        });
        dispatch(setUserMessage({
          title: "Email enviado",
          message: "Se ha enviado el email con la solicitud de revision al usuario",
          details: []
        }))
        dispatch(setUserBusyMode(false));
      } catch (error) {
        dispatch(setUserBusyMode(false));
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "POST: http://localhost:3001/adoption_request/send_request_data_review_email/" }
        ])));
      }
    })
  }

  const SendRejectAdoptionRequestEmail = () => {
    emailEditorRef.current.editor.exportHtml(async data => {
      try {
        const { html } = data
        const userId = richTextEditorState.data.userData.id;
        hideModals();

        dispatch(setUserBusyMode(true));
        const response = await api.post("/adoption_request/reject_adoption_request", {
          userId,
          emailHTML: html
        });
        dispatch(setUserMessage({
          title: "Email enviado",
          message: "Se ha enviado el email con la notificacion de rechazo al usuario",
          details: []
        }))
        dispatch(setUserBusyMode(false));
      } catch (error) {
        dispatch(setUserBusyMode(false));
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "POST: http://localhost:3001/adoption_request/reject_adoption_request/" }
        ])));
      }
    })
  }

  const getOnSendEmailFunction = () => {
    switch (richTextEditorState.type) {
      case "requestDataReview":
        return SendRequestDataReviewEmail;
      case "rejectAdoptionRequest":
        return SendRejectAdoptionRequestEmail;
      default:
        return null;
    }
  }

  useEffect(() => {
    /*fetch("http://localhost:3001/users")
      .then((data) => data.json())
      .then((data) => {
        UpdateTableDataUsers(data);
        dispatch(setUserBusyMode(false));
      })*/

    (async () => {
      try {
        dispatch(setUserBusyMode(true));
        const response = await api.get("/users");
        UpdateTableDataUsers(response.data);
        dispatch(setUserBusyMode(false));
      } catch (error) {
        dispatch(setUserBusyMode(false));
        dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
          { code: error.code },
          { request: "GET: http://localhost:3001/users" }
        ])));
      }
    })();
  }, [])

  useEffect(() => {

  }, [dataUser]);

  return (
    <div style={{ height: "calc(100vh - 350px)", width: '100%', marginBottom: "13px" }}>
      <DataGrid
        rows={tableDataUsers}
        columns={columns}
        pageSize={50}
        rowsPerPageOptions={[50]}
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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Paper sx={{ width: "calc(100vw - 100px)", height: "calc(100vh - 100px)", marginTop: "50px", overflow: "auto" }}>
                <AdoptionRequestForm data={adoptionRequestFormData} adminMode={true} UpdatedUserInfo={UpdatedUserInfo} RequestDataReview={RequestDataReview} RejectAdoptionRequest={RejectAdoptionRequest} />
              </Paper>
            </Box>
          </Modal>
          :
          null
      }
      {
        richTextEditorState.visible ?
          <Modal
            keepMounted
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            open={richTextEditorState.visible}
            onClose={handleClose}
          >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Paper sx={{ width: "calc(100vw - 300px)", height: "calc(100vh - 100px)", marginTop: "50px", overflow: "auto", padding: "20px" }}>
                <Box sx={{ borderStyle: "solid", borderColor: "silver", borderWidth: "1px", height: "calc(100% - 100px)" }}>
                  <EmailEditor minHeight="100%" ref={emailEditorRef} onReady={onReadyEmailEditor} />
                </Box>
                <Box sx={{ paddingTop: "30px" }}>
                  {/*
                  <Button onClick={saveDesign}>Save Template</Button>
                  /**/}
                  <Button onClick={getOnSendEmailFunction()} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Enviar"}</Button>
                  <Button onClick={handleClose} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Cancelar"}</Button>
                </Box>
              </Paper>
            </Box>
          </Modal>
          :
          null
      }
    </div>
  );
}