import { Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';


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

    const { item, data } = props;

    const RemoveIt = () => {
        if (props.onRemove) {
            props.onRemove(data.id);
        }
    }

    const OnChange = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if(!isNaN(parseFloat(propertyValue))){
            propertyValue = parseFloat(propertyValue);
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
                        Referencia Personal #{item + 1}:
                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={RemoveIt}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.name} type={"text"} name="name" label={"Nombre:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.surname} type={"text"} name="surname" label={"Apellido:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.age} type={"number"} name="age" label={"Edad:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.email} type={"email"} name="email" label={"Correo:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={OnChange} name="hasAJob" checked={data.hasAJob} />} label="Empleado" />
                    </FormGroup>
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.occupation} type={"text"} name="occupation" label={"Ocupacion:"} sx={{ width: "100%" }} />
                </Grid>
                <Grid item md={6}>
                    <TextField size="small" onChange={OnChange} value={data.relationship} type={"text"} name="relationship" label={"Parentesco:"} sx={{ width: "100%" }} />
                </Grid>
            </Grid>
        </Paper>
    </Box>
}

export default PersonalReference;