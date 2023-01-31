import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from 'react-redux'
import style from "./PetInfoCard.module.css";
import bg_1 from "../../assets/image/pet-info-background-1.png"
import bg_2 from "../../assets/image/pet-info-background-2.png"
import bg_3 from "../../assets/image/pet-info-background-3.png"
import bg_4 from "../../assets/image/pet-info-background-4.png"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const PetInfoCard = (props) => {

    const navigate = useNavigate();
    const { pet_id } = useParams();
    const lang = useSelector((state) => state.lang.currentLangData);
    const petData = useSelector((state) => state.pets.petsList.filter(petData => {
        return petData.id === pet_id
    })[0]);

    useEffect(() => {

    }, [lang]);

    return (
        <div className={style.pet_card_info_div}>
            {
                petData ? <Container>
                    <Box sx={{
                        position: "relative",
                        height: {
                            md: "100vh",
                            xs: "auto"
                        },
                        width: {
                            md: "auto",
                            xs: "100%"
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: {
                            md: "center",
                            xs: "flex-start"
                        },
                        marginTop: {
                            md: 0,
                            xs: "16px"
                        }
                    }}>
                        <Box sx={{
                            position: "relative",
                            display: {
                                md: "block",
                                xs: "none"
                            },
                            width: "790px",
                            height: "654px"
                        }}>
                            <Box className={style.bg_image_1}>
                                <img src={bg_1} />
                            </Box>
                            <Box className={style.bg_image_2}>
                                <img src={bg_2} />
                            </Box>
                            <Box className={style.bg_image_3}>
                                <img src={bg_3} />
                            </Box>
                            <Box className={style.bg_image_4}>
                                <img src={bg_4} />
                            </Box>
                        </Box>
                        <Paper sx={{
                            position: "absolute",
                            maxWidth: "790px !important",
                            width: {
                                md: "auto",
                                xs: "100%"
                            }
                        }}>
                            <Grid container>
                                <Grid item xs={12} sx={{
                                    position: "relative",
                                    overflow: "hidden",
                                    height: {
                                        md: 250,
                                        xs: 125
                                    },
                                    width: {
                                        md: 790,
                                        xs: "100%"
                                    },
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10
                                }}>
                                    <Box sx={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        height: {
                                            md: 250,
                                            xs: 125
                                        },
                                        width: {
                                            md: 790,
                                            xs: "100%"
                                        },
                                        backgroundImage: "url('" + petData.img + "')",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        boxSizing: "border-box",
                                        borderTopLeftRadius: "20px",
                                        filter: "blur(8px)"

                                    }}></Box>
                                    <Box sx={{
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        height: {
                                            md: 250,
                                            xs: 125
                                        },
                                        width: {
                                            md: 790,
                                            xs: "100%"
                                        },
                                        padding: "10px"
                                    }}>
                                        <Box sx={{
                                            height: "100%",
                                            width: "100%",
                                            backgroundImage: "url('" + petData.img + "')",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            backgroundClip: "padding-box"
                                        }}></Box>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} sx={{
                                    margin: "20px",
                                    marginLeft: {
                                        md: "50px",
                                        xs: "40px"
                                    }
                                }}>
                                    <Typography component="p">
                                        <strong>{lang.petInfoCard.labels.publicado}: </strong>
                                        <span>{petData.date.replaceAll("-", "/")}</span>
                                    </Typography>
                                    <Typography component="h1" variant="h3" color="primary">
                                        {petData.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        flexDirection: {
                                            md: "row",
                                            xs: "column-reverse"
                                        }
                                    }}>
                                        <Box sx={{
                                            maxWidth: {
                                                md: 340,
                                                xs: "auto"
                                            },
                                            width: {
                                                md: "50%",
                                                xs: "100%"
                                            },
                                            marginLeft: {
                                                md: "40px",
                                                xs: "80px"
                                            }
                                        }}>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.especie}: </strong>
                                                <span>{petData.species}</span>
                                            </Typography>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.genero}: </strong>
                                                <span>{petData.genre}</span>
                                            </Typography>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.edad}: </strong>
                                                <span>{petData.age}</span>
                                            </Typography>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.tamaño}: </strong>
                                                <span>{petData.size}</span>
                                            </Typography>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.peso}: </strong>
                                                <span>{petData.weight}</span>
                                            </Typography>
                                            <Typography component="p">
                                                <strong>{lang.petInfoCard.labels.raza}: </strong>
                                                <span>{petData.breed}</span>
                                            </Typography>
                                        </Box>
                                        <Divider component={"div"} orientation="vertical" sx={{
                                            height: "140px",
                                            display: {
                                                md: "block",
                                                xs: "none"
                                            }
                                        }} />
                                        <Divider component={"div"} orientation="horizontal" sx={{
                                            display: {
                                                md: "none",
                                                xs: "block"
                                            },
                                            width: "90%",
                                            boxSizing: "border-box",
                                            margin: "20px"
                                        }} />
                                        <Box sx={{
                                            maxWidth: {
                                                md: 340,
                                                xs: "auto"
                                            },
                                            width: {
                                                md: "50%",
                                                xs: "100%"
                                            },
                                            padding: "0px 40px"
                                        }}>
                                            <Box sx={{
                                                maxHeight: "200px",
                                                height: "auto",
                                                overflow: "auto"
                                            }}>
                                                {
                                                    petData.description
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sx={{
                                    display: "flex"
                                }}>
                                    <Box sx={{
                                        display: {
                                            md: "block",
                                            xs: "none"
                                        },
                                        width: "50%"
                                    }}>

                                    </Box>
                                    <Box sx={{
                                        display: {
                                            md: "block",
                                            xs: "flex"
                                        },
                                        width: {
                                            md: "50%",
                                            xs: "100%"
                                        },
                                        justifyContent: "center"
                                    }}>
                                        <Button variant="contained" type="submit" color='yellowButton' size="large" sx={{ borderRadius: '20px', my: "20px", marginRight: "5px" }} onClick={(event) => { navigate("/adoption-request/" + pet_id) }}>{lang.petInfoCard.buttons.adopcion}</Button>
                                        <Button variant="contained" type="submit" color='yellowButton' size="large" sx={{ borderRadius: '20px', my: "20px", marginLeft: "5px" }} onClick={(event) => { navigate("/adopciones") }}>{lang.petInfoCard.buttons.volver}</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Container> : null
            }
        </div>
    )
}

export default PetInfoCard;