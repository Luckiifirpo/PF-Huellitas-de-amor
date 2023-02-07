import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserBusyMode, setUserError, setUserMessage } from "../../redux/slices/userSlice";
import ErrorManager from "../../resources/ErrorManager";
import api from "../../services/api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from "@mui/system";
import { Button, Modal, Paper } from "@mui/material";
import EmailEditor from 'react-email-editor';

import contactUsReplyEmailTemplate from "./EmailTemplates/ContactUsReply.json";

const DataTableContactUs = (props) => {

    const columns = [
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
            field: 'email',
            headerName: 'Email',
            width: 220
        },
        {
            field: 'description',
            headerName: 'Descripcion',
            width: 620
        },
        {
            field: 'edit',
            headerName: 'Ver Descripcion',
            type: 'actions',
            width: 180,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={< VisibilityIcon />}
                    label="Ver Descripcion"
                    onClick={(e) => { handleOpenUser(params.id, params.row.name, params.row.email, params.row.description) }}
                />,

            ],
        }
    ]

    const dispatch = useDispatch();
    const [contactUsData, setContactUsData] = useState([]);
    const [descriptionViewerState, setDescriptionViewerState] = useState({
        visible: false,
        data: {
            id: null,
            name: null,
            email: null,
            description: null
        }
    });
    const [richTextEditorState, setRichTextEditorState] = useState({
        data: null,
        visible: false
    });

    const emailEditorRef = useRef(null);


    const handleOpenUser = (id, name, email, description) => {
        setDescriptionViewerState({
            visible: true,
            data: {
                id,
                name,
                email,
                description
            }
        })
    }

    const handleClose = () => {
        hideModals();
    };

    const onReadyEmailEditor = () => {
        let strJSON = JSON.stringify(contactUsReplyEmailTemplate);
        strJSON = strJSON.replace("{user_name}", richTextEditorState.data.name);
        strJSON = strJSON.replace("{user_description}", richTextEditorState.data.description);
        //emailEditorRef.current.editor.loadDesign(JSON.parse(strJSON));
    }

    const hideModals = () => {
        setDescriptionViewerState({
            visible: false,
            data: {
                id: null,
                name: null,
                email: null,
                description: null
            }
        });
        setRichTextEditorState({
            visible: false,
            data: null
        })
    }

    const replyContactUsRequest = () => {
        hideModals();
        setRichTextEditorState({
            visible: true,
            data: { ...descriptionViewerState.data }
        })
    }

    const saveDesign = () => {
        /*emailEditorRef.current.editor.saveDesign(design => {
            console.log('saveDesign', JSON.stringify(design))
        })*/
        emailEditorRef.current.editor.exportHtml(data => {
            console.log(data.html);
        });
    }

    const sendEmail = async () => {
        emailEditorRef.current.editor.exportHtml(async data => {
            try {
                dispatch(setUserBusyMode(true));
                const { html } = data
                await api.post("/contactus/reply", {
                    email: richTextEditorState.data.email,
                    emailHTML: html
                });
                dispatch(setUserMessage({
                    title: "Email enviado",
                    message: "Se ha enviado el email con la respuesta al usuario",
                    details: []
                }))
                dispatch(setUserBusyMode(false));
            } catch (error) {
                dispatch(setUserBusyMode(false));
                dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
                    { code: error.code },
                    { request: "POST: http://localhost:3001/contactus/reply" }
                ])));
            }
        });
    }

    useEffect(() => {
        (async () => {
            try {
                dispatch(setUserBusyMode(true));
                const response = await api.get("/contactus");
                const data = response.data;
                const filteredData = data.filter(e => {
                    return e.name !== "$NewsLetter$";
                })
                setContactUsData(filteredData);
                dispatch(setUserBusyMode(false));
            } catch (error) {
                dispatch(setUserBusyMode(false));
                dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
                    { code: error.code },
                    { request: "GET: http://localhost:3001/contactus/" }
                ])));
            }
        })();
    }, []);

    return (
        <div style={{ height: "calc(100vh - 350px)", width: '100%', marginBottom: "13px" }}>
            <DataGrid
                rows={contactUsData}
                columns={columns}
                pageSize={50}
                rowsPerPageOptions={[50]}
                checkboxSelection
            />

            {
                descriptionViewerState.visible ? <Modal
                    keepMounted
                    open={descriptionViewerState.visible}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description">
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Paper sx={{ width: "calc(100vw - 300px)", height: "calc(100vh - 100px)", marginTop: "50px", overflow: "auto", padding: "20px" }}>
                            <Box sx={{ borderStyle: "solid", borderColor: "silver", borderWidth: "1px", height: "calc(100% - 100px)", overflow: "auto", padding: "20px 40px" }}>
                                <p>
                                    {descriptionViewerState.data.description}
                                </p>
                            </Box>
                            <Box sx={{ paddingTop: "30px" }}>
                                <Button onClick={replyContactUsRequest} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Responder"}</Button>
                                <Button onClick={handleClose} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Cancelar"}</Button>
                            </Box>
                        </Paper>
                    </Box>
                </Modal> : null}
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
                                    {/**/
                                        <Button onClick={saveDesign}>Save Template</Button>
                                    /**/}
                                    <Button onClick={sendEmail} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Enviar"}</Button>
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

export default DataTableContactUs;