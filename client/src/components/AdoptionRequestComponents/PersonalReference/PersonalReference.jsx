import { Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"


/*
const personal_reference_template = {
    name: "",
    surname: "",
    age: 0,
    phoneNumber: "",
    email: "",
    hasAJob: true,
    occupation: "",
    relationship: ""
}
*/

const PersonalReference = (props) => {
    const lang = useSelector((state) => state.lang.currentLangData);
    const { item, data, adminMode } = props;
    const [formErrors, setFormErrors] = useState(adminMode ? 
        {
            name: false,
            surname: false,
            age: false,
            relationship: false
        } : 
        {
            name: true,
            surname: true,
            age: true,
            relationship: true
        });

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
                [propertyName]: propertyName !== "age" ? (propertyValue ? false : true) : (propertyValue && propertyValue > 0 ? false : true)
            }
            setFormErrors(newFormErrors);
        }

        if (props.onChange) {
            props.onChange(data.id, propertyName, propertyValue);
        }
    }

    return <Box>
        <Paper sx={{ padding: "20px" }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                        {lang.personalReference.title} #{item + 1}:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    { adminMode ? null : <IconButton onClick={RemoveIt}>
                        <DeleteIcon />
                    </IconButton>}
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    error={formErrors.name} 
                    helperText={formErrors.name ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.name} 
                    type={"text"} 
                    name="name" 
                    label={lang.personalReference.nombre} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    error={formErrors.surname} 
                    helperText={formErrors.surname ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.surname} 
                    type={"text"} 
                    name="surname" 
                    label={lang.personalReference.apellido} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    error={formErrors.age} 
                    helperText={formErrors.age ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.age} 
                    type={"number"} 
                    name="age" 
                    label={lang.personalReference.edad} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.email} 
                    type={"email"} 
                    name="email" 
                    label={lang.personalReference.correo} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox disabled={adminMode} onChange={OnChange} name="hasAJob" checked={data.hasAJob} />} 
                        label={lang.personalReference.empleado} />
                    </FormGroup>
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    disabled={adminMode} 
                    onChange={OnChange} 
                    value={data.occupation} 
                    type={"text"} 
                    name="occupation" 
                    label={lang.personalReference.ocupacion} 
                    sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField 
                    size="small" 
                    error={formErrors.relationship} 
                    helperText={formErrors.relationship ? "Valor Invalido" : null} 
                    disabled={adminMode} 
                    nChange={OnChange} 
                    value={data.relationship} 
                    type={"text"} 
                    name="relationship" 
                    label={lang.personalReference.parentesco} 
                    sx={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Paper>
    </Box>
}

export default PersonalReference;