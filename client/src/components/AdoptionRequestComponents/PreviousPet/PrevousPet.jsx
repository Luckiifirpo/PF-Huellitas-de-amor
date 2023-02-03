import { Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviousPetVaccine from "../PreviousPetVaccine/PreviousPetVaccine";
import { useState } from "react";
import { useEffect } from "react";

const PreviousPet = (props) => {
    const { item, data } = props;
    const [formErrors, setFormErrors] = useState({
        name: true,
        species: true
    });
    const [haveErrors, setHaveErrors] = useState(false);

    const isAliveOptions = [
        { label: "yes", value: "yes", langKey: 'si', index: 0 },
        { label: "no", value: "no", langKey: 'no', index: 1 },
        { label: "unknown", value: "unknown", langKey: 'desconocido', index: 2 }
    ]

    const RemoveIt = () => {
        if (props.onRemove) {
            props.onRemove(data.id);
        }
    }

    const OnChange = (event, value) => {
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
            props.onChange(data.id, propertyName, propertyValue);
        }
    }

    const AddVaccine = () => {
        if (props.onAddVaccine) {
            props.onAddVaccine(data.id);
        }
    }

    return <Box>
        <Paper sx={{ padding: "20px" }}>
            <Grid container spacing={1}>
                <Grid item md={6}>
                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                        Mascota #{item + 1}:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={RemoveIt}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item md={12}>
                    <TextField type={"text"} size="small" name="name" error={formErrors.name} helperText={formErrors.name ? "Valor Invalido" : null} onChange={OnChange} value={data.name} label={"Nombre:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField type={"number"} size="small" name="age" onChange={OnChange} value={data.age} label={"Edad:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField type={"text"} size="small" name="species" error={formErrors.species} helperText={formErrors.species ? "Valor Invalido" : null} onChange={OnChange} value={data.species} label={"Especie:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField type={"text"} size="small" name="details" onChange={OnChange} value={data.details} label={"Detalles:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        name="isAlive"
                        select
                        label={"Aun esta en vida:"}
                        value={isAliveOptions.filter(e => {
                            return e.value === data.isAlive
                        })[0].label}
                        onChange={OnChange}
                        SelectProps={{
                            native: true,
                        }}
                        sx={{ width: "100%" }}
                    >
                        {isAliveOptions.map((option, key) => (
                            <option key={key} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item md={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={OnChange} name="stillPreserved" checked={data.stillPreserved} />} label="Aun lo conservo" />
                    </FormGroup>
                </Grid>
                <Grid item md={12}>
                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                        Vacunas:
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Button onClick={AddVaccine} variant="outlined" size="small">Agregar</Button>
                </Grid>
                {
                    data.vaccines.map((vaccineData, key) => {
                        return <Grid key={key} item md={12}>
                            <PreviousPetVaccine data={vaccineData} petId={data.id} item={key} onRemove={props.onRemoveVaccine} onChange={props.onChangeVaccine} />
                        </Grid>
                    })
                }
            </Grid>
        </Paper>
    </Box>
}

export default PreviousPet;