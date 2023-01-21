import { Button, Card, CardContent, CardMedia, Divider, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import style from "./PetInfoCard.module.css";
import bg_1 from "../../assets/image/pet-info-background-1.png"
import bg_2 from "../../assets/image/pet-info-background-2.png"
import bg_3 from "../../assets/image/pet-info-background-3.png"
import bg_4 from "../../assets/image/pet-info-background-4.png"

const testingData = {
    id: "10",
    date: "20-jan-2023",
    species: "Dog",
    name: "Mally",
    age: "2 years",
    weight: "12kg",
    size: "medium",
    genre: "female",
    breed: "gray",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit porro nostrum voluptatem exercitationem dolorem, hic et maxime eveniet.",
    img: "../Sample Pets/pet5.jpg"
}

const PetInfoCard = (props) => {
    return (
        <div className={style.pet_card_info_div}>
            <Container style={{ minHeight: "800px", height: "100vh", display: "flex" }}>
                <Grid container style={{ position: "relative" }} alignItems={"center"} justifyContent={"center"}>
                    <div className={style.background_container}>
                        <img className={style.background_container_img_1} src={bg_1} />
                        <img className={style.background_container_img_2} src={bg_2} />
                        <img className={style.background_container_img_3} src={bg_3} />
                        <img className={style.background_container_img_4} src={bg_4} />
                    </div>
                    <Paper style={{ width: "70%", height: "70%", minHeight: "450px" }}>
                        <Grid item style={{ height: "100%" }}>
                            <Grid container style={{ height: "100%" }}>
                                <Grid className={style.pet_image_container} item sx={12} style={{ backgroundImage: "url('" + testingData.img + "')" }}>

                                </Grid>
                                <Grid item sm={5} spacing={0} style={{ display: "flex", justifyContent: "center" }} alignItems={"flex-start"}>
                                    <Grid container style={{ maxWidth: "250px" }} alignItems={"flex-start"} justifyContent={"center"} flexDirection="column">
                                        <Grid item>
                                            <Typography component="p" sx={{ margin: '10px 0px' }}><strong>Publicado: </strong><span>{testingData.date.replaceAll("-", "/")}</span></Typography>
                                        </Grid>
                                        <Grid item style={{ marginBottom: "20px" }}>
                                            <Typography component="h1" variant="h4" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                                {testingData.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Especie: </strong><span>{testingData.species}</span></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Genero: </strong><span>{testingData.genre}</span></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Edad: </strong><span>{testingData.age}</span></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Tamaño: </strong><span>{testingData.size}</span></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Peso: </strong><span>{testingData.weight}</span></Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography component="p"><strong>Raza: </strong><span>{testingData.breed}</span></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Divider style={{ height: "50%" }} component="div" orientation="vertical" />
                                </Grid>
                                <Grid item sm={5}>
                                    <Grid container style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <Grid item>
                                            <Typography style={{ marginRight: "40px" }} component="p">{testingData.description}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container style={{ paddingRight: "40px", marginBottom: "20px" }}>
                                                <Grid item sm="6" style={{display: "flex", justifyContent: "center"}}>
                                                    <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: 8 }}>Adopcion</Button>
                                                </Grid>
                                                <Grid item sm="6" style={{display: "flex", justifyContent: "center"}}>
                                                    <Button variant="contained" color='info' size="large" sx={{ borderRadius: '20px', marginTop: 8 }} >Volver</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
        </div>
    )
}

export default PetInfoCard;