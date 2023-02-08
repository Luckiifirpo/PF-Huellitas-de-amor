import { Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { useSelector } from "react-redux"

const PreviousPetVaccine = (props) => {
    const lang = useSelector((state) => state.lang.currentLangData);
    const { item, data, adminMode } = props;
    const [formErrors, setFormErrors] = useState({
        name: !adminMode
    });

    const OnChange = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        if (event.target.name === "appliedOn") {
            propertyValue = event.target.value;
        }

        if (formErrors.hasOwnProperty(propertyName)) {
            const newFormErrors = {
                ...formErrors,
                [propertyName]: propertyValue ? false : true
            }

            setFormErrors(newFormErrors);
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
                <TextField 
                size="small" 
                error={formErrors.name} 
                helperText={formErrors.name ? "Valor Invalido" : null} 
                disabled={adminMode} 
                onChange={OnChange} 
                value={data.name} 
                type={"text"} 
                name="name" 
                label={lang.previousPet.agregarVacunas.nombre} 
                sx={{ width: "100%" }} />
            </Grid>
            <Grid item md={adminMode ? 6 : 5}>
                <TextField 
                size="small" 
                disabled={adminMode} 
                onChange={OnChange} 
                value={data.appliedOn} 
                type={"date"} 
                name="appliedOn" 
                label={lang.previousPet.agregarVacunas.fecha} 
                sx={{ width: "100%" }} />
            </Grid>
            <Grid item md={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
                {adminMode ? null : <IconButton onClick={RemoveIt}>
                    <DeleteIcon />
                </IconButton>}
            </Grid>
        </Grid>
    </Box>
}

export default PreviousPetVaccine;