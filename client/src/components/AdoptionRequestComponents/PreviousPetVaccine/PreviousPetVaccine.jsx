import { Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';

const PreviousPetVaccine = (props) => {

    const { item, data } = props;

    const OnChange = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        if(event.target.name === "appliedOn"){
            propertyValue = event.target.value;
        }

        if (props.onChange) {
            props.onChange(props.petId, data.id, propertyName, propertyValue);
        }
    }

    const RemoveIt = () => {
        if (props.onRemove) {
            props.onRemove(props.petId, data.id);
        }
    }

    return <Box>
        <Grid container spacing={1}>
            <Grid item md={6}>
                <TextField size="small" onChange={OnChange} value={data.name} type={"text"} name="name" label={"Nombre:"} sx={{ width: "100%" }} />
            </Grid>
            <Grid item md={5}>
            <TextField size="small" onChange={OnChange} value={data.appliedOn} type={"date"} name="appliedOn" label={"Fecha de Aplicacion:"} sx={{ width: "100%" }} />
            </Grid>
            <Grid item md={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={RemoveIt}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
        </Grid>
    </Box>
}

export default PreviousPetVaccine;