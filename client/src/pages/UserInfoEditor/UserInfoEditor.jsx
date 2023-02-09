import { Avatar, Button, Card, CardActionArea, CardContent, Checkbox, FormControlLabel, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField } from "@mui/material";
import { Box, Container } from "@mui/system";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LeftSideUserCard from "../../components/LeftSideUserCard/LeftSideUserCard";
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from "react";
import { setError } from "../../redux/slices/errorsSlice";
import ErrorManager from "../../resources/ErrorManager";
import _ from "lodash";
import { setUserBusyMode, updateUserInfo } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";

const UserInfoEditor = (props) => {
    const cloudinary_cloud_name = "dydncradb";
    const cloudinary_preset = "qeohapyd";
    const currentUser = useSelector((state) => state.users.currentUser);
    const loginType = useSelector((state) => state.users.loginType);
    const lang = useSelector((state) => state.lang.currentLangData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [localUserInfoData, setLocalUserInfoData] = useState(null);
    const [lastUpdatedCurrentUser, setLastUpdatedCurrentUserData] = useState(null);

    const handle_change_input = (event) => {
        const input_name = event.target.name;
        const input_value = input_name === "hasAJob" ? event.target.checked : event.target.value;

        const newLocalUserInfoData = {
            ...localUserInfoData,
            [input_name]: input_name === "age" ? parseFloat(input_value) : input_value
        }

        setLocalUserInfoData(newLocalUserInfoData);
    }

    const open_file_input_user_image = (event) => {
        const file_input = document.querySelector("#hidden-user-info-editor-file-input");
        file_input.click();
    }

    const select_user_image = (event) => {
        var reader = new FileReader();

        reader.onload = (e) => {
            setLocalUserInfoData({
                ...localUserInfoData,
                localPhoto: {
                    file: event.target.files[0],
                    data: e.target.result
                }
            })
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    const update_user_info = async (event) => {

        dispatch(setUserBusyMode(true));
        const newPhotoURL = await upload_user_photo_to_cloudinary();

        const newUserInfoData = {
            ...localUserInfoData,
            photoURL: newPhotoURL ? newPhotoURL : localUserInfoData.photoURL
        }

        // console.log(newUserInfoData);

        dispatch(updateUserInfo(newUserInfoData));
    }

    const upload_user_photo_to_cloudinary = async () => {

        if (localUserInfoData.localPhoto.file) {
            const cloudinary_url = `https://api.cloudinary.com/v1_1/${cloudinary_cloud_name}/image/upload`;

            const formData = new FormData();
            formData.append("upload_preset", `${cloudinary_preset}`);
            formData.append("file", localUserInfoData.localPhoto.file);

            const cloudinary_upload_response = await fetch(cloudinary_url, {
                method: "POST",
                body: formData,
            });

            if (!cloudinary_upload_response.ok) {
                dispatch(
                    setError(
                        ErrorManager.CreateErrorInfoObject(
                            {
                                name: "CloudinaryUploadImageError",
                                code: "Unknown",
                            },
                            []
                        )
                    )
                );
                return null;
            }
            const data = await cloudinary_upload_response.json();
            return data.secure_url;
        }

        return null;
    }

    useEffect(() => {
        if (currentUser) {
            if (!_.isEqual(lastUpdatedCurrentUser, currentUser)) {
                setLastUpdatedCurrentUserData(currentUser);
                setLocalUserInfoData({
                    ...currentUser,
                    localPhoto: {
                        file: null,
                        data: null
                    }
                })
            }
        } else {
            dispatch(setToGoAfterLogin("/user-info-editor"));
            navigate("/iniciar-sesion");
        }

    }, [currentUser, localUserInfoData, lastUpdatedCurrentUser, lang, loginType]);

    return <div style={{ minHeight: "calc(100vh - 267px)" }}>
        <Container style={{ marginBottom: 30, marginTop: 130 }}>
            <Grid container spacing={5} alignItems="flex-start">
                <Grid item md={4}>
                    <LeftSideUserCard />
                </Grid>
                <Grid item md={8}>
                    <Box>
                        <Grid container>
                            <Grid item md={6} sx={{ paddingRight: "20px" }}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="name" value={localUserInfoData ? localUserInfoData.name : ""} onChange={handle_change_input} label={lang.userInfoEditor.inputs.nombre} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="age" value={localUserInfoData ? localUserInfoData.age : 0} type={"number"} onChange={handle_change_input} label={lang.userInfoEditor.inputs.edad} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="email" value={localUserInfoData ? localUserInfoData.email : ""} type={"email"} onChange={handle_change_input} label={lang.userInfoEditor.inputs.correo} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <Paper sx={{ padding: "5px", width: "100%" }}>
                                                <Box sx={{
                                                    width: "100%",
                                                    height: "250px",
                                                    backgroundImage: "url(" + (localUserInfoData ? localUserInfoData.localPhoto.data : null) + ")",
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center"
                                                }}>
                                                    {localUserInfoData ? (localUserInfoData.localPhoto.data ? null :
                                                        <Avatar variant="rounded" sx={{ width: "100%", height: "100%" }} />) : null}
                                                </Box>
                                            </Paper>
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <Card>
                                                <CardActionArea onClick={open_file_input_user_image}>
                                                    <CardContent sx={{ padding: "0px !important" }}>
                                                        <List>
                                                            <ListItem>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <CameraAltOutlinedIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={lang.userInfoEditor.fotoPerfil.fotoPerfil} secondary={localUserInfoData ? (localUserInfoData.localPhoto.file ? localUserInfoData.localPhoto.file.name : lang.userInfoEditor.fotoPerfil.sinFoto) : lang.userInfoEditor.fotoPerfil.sinFoto} />
                                                            </ListItem>
                                                        </List>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <Button onClick={update_user_info} variant="contained" color='yellowButton' size="medium" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, marginBottom:'15px' }}>{lang.userInfoEditor.buttons.actualizarDatos}</Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6} sx={{ paddingLeft: "20px" }}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="surname" value={localUserInfoData ? localUserInfoData.surname : ""} onChange={handle_change_input} label={lang.userInfoEditor.inputs.apellido} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="direction" value={localUserInfoData ? localUserInfoData.direction : ""} onChange={handle_change_input} label={lang.userInfoEditor.inputs.direccion} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <FormControlLabel control={<Checkbox name="hasAJob" onChange={handle_change_input} checked={localUserInfoData ? (localUserInfoData.hasAJob) : false} />} label={lang.userInfoEditor.inputs.empleado} />
                                        </Grid>
                                        <Grid item sx={{ width: "100%" }}>
                                            <TextField name="occupation" value={localUserInfoData ? localUserInfoData.occupation : ""} onChange={handle_change_input} label={lang.userInfoEditor.inputs.ocupacion} sx={{ width: "100%" }} disabled={localUserInfoData ? !localUserInfoData.hasAJob : true} />
                                        </Grid>

                                        {loginType === "withEmailAndPassword" ? <Grid item sx={{ width: "100%" }}>
                                            <Link to="/cambio-contraseña">{lang.userInfoEditor.link}</Link>
                                        </Grid> : null}
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <input accept="image/*" onChange={select_user_image} type="file" id="hidden-user-info-editor-file-input" hidden />
    </div>
}

export default UserInfoEditor;