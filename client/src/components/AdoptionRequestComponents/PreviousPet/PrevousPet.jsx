import { Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import PreviousPetVaccine from "../PreviousPetVaccine/PreviousPetVaccine";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PreviousPet = (props) => {
    const lang = useSelector((state) => state.lang.currentLangData);
    const { item, data, adminMode } = props;
    const [formErrors, setFormErrors] = useState(adminMode ?
        {
            name: false,
            species: false
        } :
        {
            name: true,
            species: true
        });
    const [haveErrors, setHaveErrors] = useState(false);

    const isAliveOptions = [
        { label: lang.previousPet.aunViveOptions.si, value: "yes", langKey: 'si', index: 0 },
        { label: lang.previousPet.aunViveOptions.no, value: "no", langKey: 'no', index: 1 },
        { label: lang.previousPet.aunViveOptions.noLoSe, value: "unknown", langKey: 'desconocido', index: 2 }
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
                        {lang.previousPet.title} #{item + 1}:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {adminMode ? null : <IconButton onClick={RemoveIt}>
                        <DeleteIcon />
                    </IconButton>}
                </Grid>
                <Grid item md={12}>
                    <TextField 
                    type={"text"} 
                    size="small" 
                    name="name" 
                    error={formErrors.name} 
                    helperText={formErrors.name ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.name} 
                    label={lang.previousPet.nombre} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField 
                    type={"number"} 
                    size="small" 
                    name="age" 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.age} 
                    label={lang.previousPet.edad} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField 
                    type={"text"} 
                    size="small" 
                    name="species" 
                    error={formErrors.species} 
                    helperText={formErrors.species ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.species} 
                    label={lang.previousPet.especie} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField 
                    type={"text"} 
                    size="small" 
                    name="details" 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.details} 
                    label={lang.previousPet.detalles} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={12}>
                    <TextField
                        name="isAlive"
                        select
                        label={lang.previousPet.aunVive}
                        disabled={adminMode}
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
                        <FormControlLabel control={<Checkbox onChange={OnChange} disabled={adminMode} name="stillPreserved" checked={data.stillPreserved} />} 
                        label={lang.previousPet.aunConservo} />
                    </FormGroup>
                </Grid>
                <Grid item md={12}>
                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                        {lang.previousPet.vacunas}
                    </Typography>
                </Grid>
                {
                    adminMode ? null : 
                    <Grid item md={12}>
                        <Button onClick={AddVaccine} variant="outlined" size="small">
                        {lang.adoptionForm.buttons.agregar}r</Button>
                    </Grid>
                }
                {
                    data.vaccines.map((vaccineData, key) => {
                        return <Grid key={key} item md={12}>
                            <PreviousPetVaccine data={vaccineData} petId={data.id} item={key} onRemove={props.onRemoveVaccine} onChange={props.onChangeVaccine} adminMode={adminMode}/>
                        </Grid>
                    })
                }
            </Grid>
        </Paper>
    </Box>
}

export default PreviousPet;