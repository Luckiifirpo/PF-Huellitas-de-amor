import { Grid, IconButton, Paper, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";

const ResidencesTenant = (props) => {

    const { item, data } = props;
    const [formErrors, setFormErrors] = useState({
        name: true,
        surname: true
    });
    
    const RemoveIt = () => {
        if (props.onRemove) {
            props.onRemove(data.id);
        }
    }

    const OnChange = (event, value, psychologicalDataProperty) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        if (formErrors.hasOwnProperty(propertyName)) {
            const newFormErrors = {
                ...formErrors,
                [propertyName]: propertyValue ? false : true
            }

            setFormErrors(newFormErrors);
        }

        if (props.onChange) {
            props.onChange(data.id, propertyName, propertyValue, psychologicalDataProperty);
        }
    }

    return <Box>
        <Paper sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                        Inquilino #{item + 1}:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={RemoveIt}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item md={12}>
                    <TextField size="small" error={formErrors.name} helperText={formErrors.name ? "Valor Invalido" : null} onChange={(event, value) => { OnChange(event, value, false) }} value={data.name} type={"text"} name="name" label={"Nombre:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField size="small" error={formErrors.surname} helperText={formErrors.surname ? "Valor Invalido" : null} onChange={(event, value) => { OnChange(event, value, false) }} value={data.surname} type={"text"} name="surname" label={"Apellido:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField size="small" onChange={(event, value) => { OnChange(event, value, false) }} value={data.allergies} type={"text"} name="allergies" label={"Alergias:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <Typography sx={{ fontWeight: 'Bold' }}>
                        Imagina que ya tienes tu mascota. Cual seria la reaccion de {data.name ? data.name : "esta persona"} frente a los siguientes comportamientos de tu mascota, o como reacciona generalmente frente a este tipo de situaciones:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withNoisyPet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withNoisyPet} label={"Frente a una mascota ruidosa:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withUnwantedPetWaste" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withUnwantedPetWaste} label={"Frente a los desechos indeseados de una mascota:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withHyperactivePet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withHyperactivePet} label={"Frente a una mascota hiperactiva:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withAggressivePet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withAggressivePet} label={"Frente a una mascota agresiva:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withCalmPet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withCalmPet} label={"Frente a una mascota muy calmada:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withSmallPet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withSmallPet} label={"Frente a una mascota pequeña:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withNonObedientPet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withNonObedientPet} label={"Frente a una mascota desobediente:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField type={"text"} size="small" name="withBigPet" onChange={(event, value) => { OnChange(event, value, true) }} value={data.psychologicalData.withBigPet} label={"Frente a una mascota grande:"} sx={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Paper>
    </Box>
}

export default ResidencesTenant;