import { Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

const AdoptionRequestForm = (props) => {
    return <Container style={{ marginTop: '150px', marginBottom: '10px', color: '#FF3041' }}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            DATOS PERSONALES:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"tel"} name="phoneNumber" label={"Telefono celular"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"tel"} name="phoneNumber" label={"Tel. Trabajo u Oficina"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Alergias:"} placeholder={"Ninguna"} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Nivel educacional"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Por que quieres adoptar esta mascota?"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox defaultChecked />} label="¿Estas de acuerdo con que hagamos visitas periodicas a tu residencia?" />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            TUS ACTITUDES CON UNA MASCOTA:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota ruidosa:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota hiperactiva:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota muy calmada:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota desobediente:"} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a los desechos indeseados de una mascota:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota agresiva:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota pequeña:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="phoneNumber" label={"Frente a una mascota grande:"} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            REFERENCIAS PERSONALES:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            MASCOTAS ANTERIORES:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            INQUILINOS EN TU RESIDENCIA:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            SOBRE TU VIVIENDA:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{display:"flex", justifyContent: "center", marginBottom: "100px"}}>
                    <Button variant="contained" color='info' size="big" sx={{ borderRadius: '20px', paddingLeft: 10, paddingRight: 10, fontSize: "20px", width: "300px" }}>{"Enviar"}</Button>
                </Box>
            </Grid>
        </Grid>
    </Container>
}

export default AdoptionRequestForm;