import { Autocomplete, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PersonalReference from "../../components/AdoptionRequestComponents/PersonalReference/PersonalReference";
import PreviousPet from "../../components/AdoptionRequestComponents/PreviousPet/PrevousPet";
import ResidencesTenant from "../../components/AdoptionRequestComponents/ResidencesTenant/ResidencesTenant";
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";
import { createAdoptionRequest, setUserBusyMode, setUserError, setUserMessage } from "../../redux/slices/userSlice";
import ErrorManager from "../../resources/ErrorManager";
import api from "../../services/api";

const applicants_residence_template = {
    actualResidence: false,
    type: "semi-detached",
    ownHouse: true,
    homeownerName: null,
    homeownerSurname: null,
    homeownerPhoneNumber: 0,
    withPatio: true,
    withTerrace: true,
    withGarden: true,
    coveredPetArea: true,
    petAreaDimension: 0
};

const previous_pet_template = {
    name: "",
    species: "",
    isAlive: "yes",
    stillPreserved: true,
    age: 0,
    details: "beautiful",
    vaccines: []
}

const previous_pets_vaccine_template = {
    name: "",
    appliedOn: "2000-01-01"
}

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

const residences_tenant_template = {
    name: "",
    surname: "",
    allergies: "",
    psychologicalData: {
        withNoisyPet: "",
        withHyperactivePet: "",
        withCalmPet: "",
        withNonObedientPet: "",
        withUnwantedPetWaste: "",
        withAggressivePet: "",
        withBigPet: "",
        withSmallPet: ""
    }
}

const adoption_request_template = {
    user_id: "",
    pet_id: "",
    phoneNumber: "",
    workplacePhoneNumber: "",
    educationalLevel: "professional",
    reasonForRequest: "",
    numberOfTenants: 0,
    allTenantsAgreeToAdoption: true,
    acceptsPeriodicVisits: true,
    plansToChangeResidence: false,
    knowYourNextResidence: false,
    childrenUnder10Years: false,
    allergies: "",
    psychologicalData: {
        withNoisyPet: "",
        withHyperactivePet: "",
        withCalmPet: "",
        withNonObedientPet: "",
        withUnwantedPetWaste: "",
        withAggressivePet: "",
        withBigPet: "",
        withSmallPet: ""
    },
    applicantsResidences: [
        {
            actualResidence: true,
            type: "semi-detached",
            ownHouse: true,
            homeownerName: null,
            homeownerSurname: null,
            homeownerPhoneNumber: 0,
            withPatio: true,
            withTerrace: true,
            withGarden: true,
            coveredPetArea: true,
        }
    ],
    previousPets: [
    ],
    personalReferences: [
    ],
    residencesTenants: [
    ]
}

const AdoptionRequestForm = (props) => {

    const { adminMode, data } = props;
    const petsList = useSelector((state) => state.pets.petsList);
    const lang = useSelector((state) => state.lang.currentLangData);
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const { pet_id } = useParams();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState(adminMode ? {
        phoneNumber: false,
        workplacePhoneNumber: false,
        reasonForRequest: false,
        minPersonalReferences: false,
        currentResidenceOwner: null,
        nextResidenceOwner: null,
        currentResidencePetArea: false,
        nextResidencePetArea: false
    } : {
        phoneNumber: true,
        workplacePhoneNumber: true,
        reasonForRequest: true,
        minPersonalReferences: true,
        currentResidenceOwner: null,
        nextResidenceOwner: null,
        currentResidencePetArea: true,
        nextResidencePetArea: false
    })

    const pet_data = data ? data.petData : petsList.filter((e) => {
        return e.id === pet_id;
    })[0];

    const educationalLevelsOptions = [
        { label: lang.adoptionForm.inputs.datosPersonales.nivelEducativoOptions.ninguno, value: "none", langKey: 'ninguno', index: 0 },
        { label: lang.adoptionForm.inputs.datosPersonales.nivelEducativoOptions.tecnico, value: "technician", langKey: 'tecnico', index: 1 },
        { label: lang.adoptionForm.inputs.datosPersonales.nivelEducativoOptions.tecnologo, value: "technologist", langKey: 'tecnologo', index: 2 },
        { label: lang.adoptionForm.inputs.datosPersonales.nivelEducativoOptions.profesional, value: "professional", langKey: 'profesional', index: 3 }
    ]

    const residenceTypesOptions = [
        { label: lang.adoptionForm.inputs.sobreResidencia.tipoViviendaOptions.separada, value: "single-detached", langKey: "separada", index: 0 },
        { label: lang.adoptionForm.inputs.sobreResidencia.tipoViviendaOptions.semiSeparada, value: "semi-detached", langKey: "semiSeparada", index: 1 },
        { label: lang.adoptionForm.inputs.sobreResidencia.tipoViviendaOptions.duplex, value: "duplex", langKey: "duplex", index: 2 },
        { label: lang.adoptionForm.inputs.sobreResidencia.tipoViviendaOptions.apartamento, value: "in-building-apartment", langKey: "inBuildingApartment", index: 3 },
        { label: lang.adoptionForm.inputs.sobreResidencia.tipoViviendaOptions.viviendaMueble, value: "movable dwelling", langKey: "movableDwelling", index: 4 }
    ]

    const [localState, setLocalState] = useState(data ? data.adoptionRequest : adoption_request_template);
    const [localNextResidence, setLocalNextResidence] = useState(applicants_residence_template);

    const GenerateID = () => {
        const chars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";
        let id = "";

        for (let it = 0; it < 50; it++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            id += chars[randomIndex];
        }

        return id;
    }

    const ChangeBaseProperty = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        const newLocalState = {
            ...localState,
            [propertyName]: propertyValue
        };

        if (propertyName === "numberOfTenants") {
            const currentNumberOfTenants = localState.numberOfTenants;
            const newNumberOfTenants = propertyValue;

            let tenantsList = [...localState.residencesTenants];

            if (currentNumberOfTenants > newNumberOfTenants) {
                if (tenantsList.length) {
                    tenantsList.pop();
                }
            } else if (newNumberOfTenants > 0 && currentNumberOfTenants < newNumberOfTenants) {
                tenantsList.push({
                    ...residences_tenant_template,
                    id: GenerateID()
                });
            }

            newLocalState.residencesTenants = tenantsList;
        }

        let nextResidencePetAreaError = formErrors.nextResidencePetArea;
        if (newLocalState.plansToChangeResidence && newLocalState.knowYourNextResidence) {
            newLocalState.applicantsResidences.push(localNextResidence);
            nextResidencePetAreaError = isNaN(localNextResidence.petAreaDimension) || localNextResidence.petAreaDimension < 1;
        } else {
            newLocalState.applicantsResidences = [newLocalState.applicantsResidences[0]];
            nextResidencePetAreaError = false;
        }

        const newFormErrors = {
            ...formErrors,
            phoneNumber: newLocalState.phoneNumber ? false : true,
            workplacePhoneNumber: newLocalState.workplacePhoneNumber ? false : true,
            reasonForRequest: newLocalState.reasonForRequest ? false : true,
            nextResidencePetArea: nextResidencePetAreaError
        };

        setFormErrors(newFormErrors);

        if (localState.hasOwnProperty(propertyName)) {
            setLocalState(newLocalState)
        }
    }

    const ChangeCurrentResidenceProperty = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        const newLocalState = {
            ...localState
        }

        newLocalState.applicantsResidences[0] = {
            ...localState.applicantsResidences[0],
            [propertyName]: propertyValue
        }

        const newFormErrors = {
            ...formErrors,
            currentResidencePetArea: isNaN(parseFloat(newLocalState.applicantsResidences[0].petAreaDimension)) || parseFloat(newLocalState.applicantsResidences[0].petAreaDimension) < 1,
            currentResidenceOwner: !newLocalState.applicantsResidences[0].ownHouse ? {
                homeownerName: newLocalState.applicantsResidences[0].homeownerName ? false : true,
                homeownerSurname: newLocalState.applicantsResidences[0].homeownerSurname ? false : true,
                homeownerPhoneNumber: newLocalState.applicantsResidences[0].homeownerPhoneNumber ? false : true
            } : null
        }

        setFormErrors(newFormErrors);
        setLocalState(newLocalState);
    }

    const ChangeNextResidenceProperty = (event, value) => {
        const propertyName = event.target.name;
        let propertyValue = value != undefined ? value : event.target.value;

        if (!isNaN(parseFloat(propertyValue))) {
            propertyValue = parseFloat(propertyValue);
        }

        const newLocalState = {
            ...localState
        }

        newLocalState.applicantsResidences[1] = {
            ...localState.applicantsResidences[1],
            [propertyName]: propertyValue
        }

        const newFormErrors = {
            ...formErrors,
            nextResidencePetArea: isNaN(parseFloat(newLocalState.applicantsResidences[1].petAreaDimension)) || parseFloat(newLocalState.applicantsResidences[1].petAreaDimension) < 1,
            nextResidenceOwner: !newLocalState.applicantsResidences[1].ownHouse ? {
                homeownerName: newLocalState.applicantsResidences[1].homeownerName ? false : true,
                homeownerSurname: newLocalState.applicantsResidences[1].homeownerSurname ? false : true,
                homeownerPhoneNumber: newLocalState.applicantsResidences[1].homeownerPhoneNumber ? false : true
            } : null
        }

        setFormErrors(newFormErrors);

        setLocalState(newLocalState);
        setLocalNextResidence({
            ...localNextResidence,
            [propertyName]: propertyValue
        })
    }

    const ChangeApplicantsPsychologicalData = (event, value) => {
        const propertyName = event.target.name;
        const propertyValue = value != undefined ? value : event.target.value;

        const newLocalState = {
            ...localState,
            psychologicalData: {
                ...localState.psychologicalData,
                [propertyName]: propertyValue
            }
        }

        setLocalState(newLocalState);
    }

    const EducationalLevelOnChange = (event, value) => {
        const selectedIndex = educationalLevelsOptions.filter((e) => {
            return e.index === event.target.options.selectedIndex;
        })[0];

        const newLocalState = {
            ...localState,
            educationalLevel: selectedIndex.value
        }

        setLocalState(newLocalState);
    }

    const ApplicantsActualResidenceTypeOnChange = (event, value) => {
        const selectedIndex = residenceTypesOptions.filter((e) => {
            return e.index === event.target.options.selectedIndex;
        })[0];

        const newLocalState = {
            ...localState
        }

        newLocalState.applicantsResidences[0].type = selectedIndex.value;
        setLocalState(newLocalState);
    }

    const ApplicantsNextResidenceTypeOnChange = (event, value) => {
        const selectedIndex = residenceTypesOptions.filter((e) => {
            return e.index === event.target.options.selectedIndex;
        })[0];

        const newLocalState = {
            ...localState
        }

        newLocalState.applicantsResidences[1].type = selectedIndex.value;
        setLocalState(newLocalState);
    }

    const AddPersonalReference = (e) => {

        const newLocalState = {
            ...localState,
            personalReferences: [...localState.personalReferences, {
                ...personal_reference_template,
                id: GenerateID()
            }]
        }

        setFormErrors({
            ...formErrors,
            minPersonalReferences: false
        });

        setLocalState(newLocalState);
    }

    const RemovePersonalReference = (id) => {
        const newLocalState = {
            ...localState,
            personalReferences: localState.personalReferences.filter(e => {
                return e.id !== id;
            })
        }

        if (!newLocalState.personalReferences.length) {
            setFormErrors({
                ...formErrors,
                minPersonalReferences: true
            });
        }

        setLocalState(newLocalState);
    }

    const UpdatePersonalReferenceData = (id, propertyName, propertyValue) => {
        const newLocalState = {
            ...localState,
            personalReferences: localState.personalReferences.map(e => {
                if (e.id === id) {
                    e[propertyName] = propertyValue
                }
                return e;
            })
        }

        setLocalState(newLocalState);
    }

    const AddPreviousPet = (e) => {
        const newLocalState = {
            ...localState,
            previousPets: [...localState.previousPets, {
                ...previous_pet_template,
                id: GenerateID()
            }]
        }

        setLocalState(newLocalState);
    }

    const RemovePreviousPet = (id) => {
        const newLocalState = {
            ...localState,
            previousPets: localState.previousPets.filter(e => {
                return e.id !== id
            })
        }

        setLocalState(newLocalState);
    }

    const UpdatePreviousPet = (id, propertyName, propertyValue) => {
        const newLocalState = {
            ...localState,
            previousPets: localState.previousPets.map(e => {
                if (e.id === id) {
                    e[propertyName] = propertyValue
                }
                return e;
            })
        }

        setLocalState(newLocalState);
    }

    const AddPreviousPetVaccine = (id) => {
        const newLocalState = {
            ...localState,
            previousPets: localState.previousPets.map(d => {
                if (d.id === id) {
                    d.vaccines = [...d.vaccines, {
                        ...previous_pets_vaccine_template,
                        id: GenerateID()
                    }]
                }

                return d;
            })
        }

        setLocalState(newLocalState);
    }

    const RemovePreviousPetVaccine = (id, vaccine_id) => {
        const newLocalState = {
            ...localState,
            previousPets: localState.previousPets.map(d => {
                if (d.id === id) {
                    d.vaccines = d.vaccines.filter(f => {
                        return f.id !== vaccine_id;
                    })
                }

                return d;
            })
        }

        setLocalState(newLocalState);
    }

    const UpdatePreviousPetVaccine = (id, vaccine_id, propertyName, propertyValue) => {
        const newLocalState = {
            ...localState,
            previousPets: localState.previousPets.map(d => {
                if (d.id === id) {
                    d.vaccines = d.vaccines.map(f => {
                        if (f.id === vaccine_id) {
                            f[propertyName] = propertyValue
                        }
                        return f;
                    });
                }

                return d;
            })
        }

        setLocalState(newLocalState);
    }

    const RemoveResidencesTenant = (id) => {
        const newLocalState = {
            ...localState,
            numberOfTenants: localState.numberOfTenants - 1,
            residencesTenants: localState.residencesTenants.filter(e => {
                return e.id !== id;
            })
        }

        setLocalState(newLocalState);
    }

    const UpdateResidencesTenant = (id, propertyName, propertyValue, psychologicalDataProperty) => {
        const newLocalState = {
            ...localState,
            residencesTenants: localState.residencesTenants.map(e => {
                if (e.id === id) {

                    if (psychologicalDataProperty) {
                        e.psychologicalData[propertyName] = propertyValue
                    } else {
                        e[propertyName] = propertyValue
                    }
                }
                return e;
            })
        }

        setLocalState(newLocalState);
    }

    const CreateAdoptionRequest = () => {
        const adoptionRequestData = {
            ...localState,
            user_id: currentUser.id,
            pet_id: pet_id
        }

        dispatch(createAdoptionRequest(adoptionRequestData));
        navigate("/")
    }

    const AuthorizeRequest = async () => {
        try {
            dispatch(setUserBusyMode(true));
            const response = await api.post("/adoption_request/authorize_adoption_request/" + localState.id)
            dispatch(setUserBusyMode(false));
            dispatch(setUserMessage({
                title: "Autorizacion Completada",
                message: "Se ha autorizado la adopcion",
                details: []
            }));

            if (props.UpdatedUserInfo) {
                props.UpdatedUserInfo();
            }

        } catch (error) {
            dispatch(setUserBusyMode(false));
            dispatch(setUserError(ErrorManager.CreateErrorInfoObject(error, [
                { code: error.code },
                { request: "POST: http://localhost:3001/adoption_request/authorize_adoption_request/:user_id" }
            ])));
        }
    }

    const RejectRequest = () => {
        if(props.RejectAdoptionRequest){
            props.RejectAdoptionRequest(data);
        }
    }

    const RequestDataReview = () => {
        if(props.RequestDataReview){
            props.RequestDataReview(data);
        }
    }

    const HaveErrors = () => {
        const personalReferencesWithErrors = localState.personalReferences.filter(e => {
            return !(e.name && e.surname && e.relationship && e.age > 0);
        });

        const residencesTenantsWithErrors = localState.residencesTenants.filter(e => {
            return !(e.name && e.surname);
        });

        const previousPetsWithErrors = localState.previousPets.filter(e => {
            const vaccinesWithErrors = e.vaccines.filter(f => {
                return !(f.name);
            });

            return !(e.name && e.species && !vaccinesWithErrors.length);
        });


        let baseError = false;

        for (const propertyName in formErrors) {

            if (propertyName !== "currentResidenceOwner" && propertyName !== "nextResidenceOwner") {
                baseError = formErrors[propertyName];
            } else {
                const obj = formErrors[propertyName];

                if (obj) {
                    for (const residenceOwnerPropertyName in obj) {
                        baseError = obj[residenceOwnerPropertyName];
                    }
                }
            }

            if (baseError)
                break;
        }

        const haveErrors = (baseError || personalReferencesWithErrors.length || residencesTenantsWithErrors.length || previousPetsWithErrors.length) ? true : false;
        return haveErrors;
    }

    useEffect(() => {
        if(!currentUser){
            dispatch(setToGoAfterLogin("/dashboard"));
            navigate("/iniciar-sesion");
        }
    }, [localState, currentUser]);

    return <Container style={{ marginTop: '150px', marginBottom: '10px', color: '#FF3041' }}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "20px" }}>
                        {
                            pet_data ?
                                <Grid container>
                                    <Grid item md={2} sx={{ position: "relative", height: "185.33px", overflow: "hidden" }}>
                                        <Box sx={{
                                            width: "185.33px",
                                            height: "185.33px",
                                            position: "absolute",
                                            backgroundImage: "url('" + pet_data.img + "')",
                                            backgroundSize: "cover",
                                            filter: "blur(10px)"
                                        }}>

                                        </Box>
                                        <Box sx={{
                                            width: "185.33px",
                                            height: "185.33px",
                                            position: "absolute",
                                            backgroundImage: "url('" + pet_data.img + "')",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center"
                                        }}></Box>
                                    </Grid>
                                    <Grid item md={8}>
                                        <Typography sx={{ marginLeft: "20px" }} component="h1" variant="h3" color="primary">
                                            {pet_data.name}
                                        </Typography>
                                        <Typography sx={{ marginLeft: "20px" }}>
                                            {pet_data.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                null
                        }
                    </Paper>
                </Box>
            </Grid>
            {adminMode ? null : <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "20px" }}>
                        <Stack spacing={2}>
                            <Alert severity="info">
                                {lang.adoptionForm.alerts.nuestrasMascotas.normal}<strong>{lang.adoptionForm.alerts.nuestrasMascotas.strong}</strong>
                            </Alert>
                            <Alert severity="warning">
                                {lang.adoptionForm.alerts.warningNuestrasMascotas.first} <strong>{lang.adoptionForm.alerts.warningNuestrasMascotas.strong}</strong><br />
                                {lang.adoptionForm.alerts.warningNuestrasMascotas.last}
                            </Alert>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>}



            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            {lang.adoptionForm.titles.datosPersonales}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"tel"} 
                                            name="phoneNumber" 
                                            error={formErrors.phoneNumber} 
                                            helperText={formErrors.phoneNumber ? "Valor Invalido" : null} 
                                            value={localState.phoneNumber} 
                                            disabled={adminMode} 
                                            onChange={ChangeBaseProperty} 
                                            label={lang.adoptionForm.inputs.datosPersonales.telefono} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"tel"} 
                                            name="workplacePhoneNumber" 
                                            error={formErrors.workplacePhoneNumber} 
                                            helperText={formErrors.workplacePhoneNumber ? "Valor Invalido" : null} 
                                            value={localState.workplacePhoneNumber} 
                                            disabled={adminMode} 
                                            onChange={ChangeBaseProperty} 
                                            label={lang.adoptionForm.inputs.datosPersonales.telTrabajoUOficina} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="allergies" 
                                            value={localState.allergies} 
                                            disabled={adminMode} 
                                            onChange={ChangeBaseProperty} 
                                            label={lang.adoptionForm.inputs.datosPersonales.alergias} 
                                            placeholder={"Ninguna"} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            {/*<TextField type={"text"} name="educationalLevel" onChange={ChangeBaseProperty} label={"Nivel educacional"} sx={{ width: "100%" }} />*/}
                                            <TextField
                                                id="educational-level"
                                                name="educationalLevel"
                                                select
                                                label={lang.adoptionForm.inputs.datosPersonales.nivelEducativo}
                                                value={educationalLevelsOptions.filter(e => {
                                                    return e.value === localState.educationalLevel
                                                })[0].label}
                                                onChange={EducationalLevelOnChange}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                sx={{ width: "100%" }}
                                                disabled={adminMode}
                                            >
                                                {educationalLevelsOptions.map((option, key) => (
                                                    <option key={key} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="reasonForRequest" 
                                            error={formErrors.reasonForRequest} 
                                            helperText={formErrors.reasonForRequest ? "Valor Invalido" : null} 
                                            value={localState.reasonForRequest} 
                                            disabled={adminMode} 
                                            onChange={ChangeBaseProperty} 
                                            label={lang.adoptionForm.inputs.datosPersonales.porQueQuieresAdoptar} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel 
                                                control={<Checkbox name="acceptsPeriodicVisits" 
                                                onChange={ChangeBaseProperty} 
                                                checked={localState.acceptsPeriodicVisits} 
                                                disabled={adminMode} />} 
                                                label={lang.adoptionForm.inputs.datosPersonales.visitasAMiResidencia} />
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
                            {lang.adoptionForm.titles.actitudesConMascota}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container spacing={3}>
                            {adminMode ? null : <Grid item md={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        {lang.adoptionForm.alerts.teAyudamosASaberSiEsParaTi}
                                    </Alert>
                                    <Alert severity="warning">
                                        {lang.adoptionForm.alerts.warningTeAyudamosASaberSiEsParaTi}
                                    </Alert>
                                </Stack>
                            </Grid>}
                            <Grid item md={12}>
                                <Typography sx={{ fontWeight: 'Bold' }}>
                                    {lang.adoptionForm.subtitles.actitudesConMascota}
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withNoisyPet" 
                                            value={localState.psychologicalData.withNoisyPet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.ruidosa} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withHyperactivePet" 
                                            value={localState.psychologicalData.withHyperactivePet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.hiperactiva} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withCalmPet" 
                                            value={localState.psychologicalData.withCalmPet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.calmada} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withNonObedientPet" 
                                            value={localState.psychologicalData.withNonObedientPet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.desobediente} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withUnwantedPetWaste" 
                                            value={localState.psychologicalData.withUnwantedPetWaste} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.desechos} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withAggressivePet" 
                                            value={localState.psychologicalData.withAggressivePet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.agresiva} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withSmallPet" 
                                            value={localState.psychologicalData.withSmallPet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.pequeña} 
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"text"} 
                                            name="withBigPet" 
                                            value={localState.psychologicalData.withBigPet} 
                                            disabled={adminMode} 
                                            onChange={ChangeApplicantsPsychologicalData} 
                                            label={lang.adoptionForm.inputs.actitudConMascota.grande} 
                                            sx={{ width: "100%" }} />
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
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                            {lang.adoptionForm.titles.referenciasPersonales}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            {
                                formErrors.minPersonalReferences ?
                                    <Grid item md={12} sx={{ marginBottom: "10px" }}>
                                        <Stack>
                                            <Alert severity="error">
                                                {lang.adoptionForm.alerts.referenciaPersonal}
                                            </Alert>
                                        </Stack>
                                    </Grid>
                                    : null
                            }
                            {adminMode ? null : <Grid item md={12}>
                                <Button onClick={AddPersonalReference} variant="outlined" size="small">
                                   {lang.adoptionForm.buttons.agregar}</Button>
                            </Grid>}
                            <Grid item md={12}>
                                <Box>
                                    <Paper sx={{ boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.35);", padding: "10px", marginTop: "10px" }}>
                                        <Grid container spacing={2}>
                                            {
                                                localState.personalReferences.map((data, key) => {
                                                    return <Grid key={key} item md={12}>
                                                        <PersonalReference data={data} item={key} onRemove={RemovePersonalReference} onChange={UpdatePersonalReferenceData} adminMode={adminMode} />
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>



            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                            {lang.adoptionForm.titles.mascotasAnteriores}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            {adminMode ? null : <Grid item md={12}>
                                <Button onClick={AddPreviousPet} variant="outlined" size="small">{lang.adoptionForm.buttons.agregar}</Button>
                            </Grid>}
                            <Grid item md={12}>
                                <Box>
                                    <Paper sx={{ boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.35);", padding: "10px", marginTop: "10px" }}>
                                        <Grid container spacing={2}>
                                            {
                                                localState.previousPets.map((data, key) => {
                                                    return <Grid key={key} item md={12}>
                                                        <PreviousPet data={data} item={key} onRemove={RemovePreviousPet} onChange={UpdatePreviousPet} onAddVaccine={AddPreviousPetVaccine} onRemoveVaccine={RemovePreviousPetVaccine} onChangeVaccine={UpdatePreviousPetVaccine} adminMode={adminMode} />
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>



            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                            {lang.adoptionForm.titles.inquilinosEnResidencia}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            <Grid item md={12}>
                                <TextField 
                                type={"number"} 
                                name="numberOfTenants" 
                                value={localState.numberOfTenants} 
                                disabled={adminMode}
                                onChange={ChangeBaseProperty} 
                                label= {lang.adoptionForm.inputs.inquilinosEnResidencia.numInquilinos} 
                                sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item md={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name="allTenantsAgreeToAdoption" onChange={ChangeBaseProperty} checked={localState.allTenantsAgreeToAdoption} disabled={adminMode} />} 
                                    label= {lang.adoptionForm.inputs.inquilinosEnResidencia.deAcuerdo} />
                                </FormGroup>
                            </Grid>
                            <Grid item md={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name="childrenUnder10Years" onChange={ChangeBaseProperty} checked={localState.childrenUnder10Years} disabled={adminMode} />} 
                                    label= {lang.adoptionForm.inputs.inquilinosEnResidencia.menoresDeDiez} />
                                </FormGroup>
                            </Grid>
                            {adminMode ? null : <Grid item md={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        {lang.adoptionForm.alerts.teAyudamosASaberSiEsParaTi}
                                    </Alert>
                                    <Alert severity="warning">
                                        {lang.adoptionForm.alerts.warningTeAyudamosASaberSiEsParaTi}
                                    </Alert>
                                </Stack>
                            </Grid>}
                            <Grid item md={12}>
                                <Box>
                                    <Paper sx={{ boxShadow: "inset 0px 0px 3px 1px rgba(0,0,0,0.35);", padding: "10px", marginTop: "10px" }}>
                                        <Grid container spacing={2}>
                                            {
                                                localState.residencesTenants.map((data, key) => {
                                                    return <Grid key={key} item md={12}>
                                                        <ResidencesTenant data={data} item={key} onRemove={RemoveResidencesTenant} onChange={UpdateResidencesTenant} adminMode={adminMode} />
                                                    </Grid>
                                                })
                                            }
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>



            <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "30px" }}>
                        <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                            {lang.adoptionForm.titles.sobreResidencia}
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            <Grid item md={12}>
                                <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                    {lang.adoptionForm.subtitles.sobreResidencia.sobrePropietario}
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="ownHouse" checked={localState.applicantsResidences[0].ownHouse} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.soyPropietario} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12} style={{ display: localState.applicantsResidences[0].ownHouse ? "none" : "block" }}>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        <TextField 
                                                        type={"text"} 
                                                        name="homeownerName" 
                                                        value={localState.applicantsResidences[0].homeownerName} 
                                                        disabled={adminMode} 
                                                        error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerName : false} 
                                                        helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerName ? "Valor Invalido" : null} 
                                                        onChange={ChangeCurrentResidenceProperty} 
                                                        label={lang.adoptionForm.inputs.sobreResidencia.nombrePropietario}  
                                                        sx={{ width: "100%" }} />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <TextField 
                                                        type={"text"} 
                                                        name="homeownerSurname" 
                                                        value={localState.applicantsResidences[0].homeownerSurname} 
                                                        disabled={adminMode} 
                                                        error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerSurname : false} 
                                                        helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerSurname ? "Valor Invalido" : null} 
                                                        onChange={ChangeCurrentResidenceProperty} 
                                                        label={lang.adoptionForm.inputs.sobreResidencia.apellidoPropietario} 
                                                        sx={{ width: "100%" }} />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <TextField 
                                                        type={"text"} 
                                                        name="homeownerPhoneNumber"
                                                        value={localState.applicantsResidences[0].homeownerPhoneNumber} 
                                                        disabled={adminMode} 
                                                        error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerPhoneNumber : false} 
                                                        helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerPhoneNumber ? "Valor Invalido" : null} 
                                                        onChange={ChangeCurrentResidenceProperty} 
                                                        label={lang.adoptionForm.inputs.sobreResidencia.telefonoPropietario} 
                                                        sx={{ width: "100%" }} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="plansToChangeResidence" checked={localState.plansToChangeResidence} disabled={adminMode} onChange={ChangeBaseProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.piensoMudarme} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="knowYourNextResidence" onChange={ChangeBaseProperty} checked={localState.knowYourNextResidence} disabled={!localState.plansToChangeResidence} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.conozcoDondeMeMudo} />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={12} sx={{ marginTop: "30px" }}>
                                <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                    {lang.adoptionForm.subtitles.sobreResidencia.detallesVivienda}
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item md={12}>
                                            <TextField
                                                id="ActualResidencesType"
                                                name="type"
                                                select
                                                label={lang.adoptionForm.inputs.sobreResidencia.tipoVivienda}
                                                value={residenceTypesOptions.filter(e => {
                                                    return e.value === localState.applicantsResidences[0].type
                                                })[0].value}
                                                onChange={ApplicantsActualResidenceTypeOnChange}
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                sx={{ width: "100%" }}
                                                disabled={adminMode}
                                            >
                                                {residenceTypesOptions.map((option, key) => (
                                                    <option key={key} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField 
                                            type={"number"} 
                                            name="petAreaDimension" 
                                            min={0} 
                                            value={localState.applicantsResidences[0].petAreaDimension} 
                                            disabled={adminMode} 
                                            error={formErrors.currentResidencePetArea} 
                                            helperText={formErrors.currentResidencePetArea ? "Valor invalido" : null} 
                                            onChange={ChangeCurrentResidenceProperty} 
                                            label={lang.adoptionForm.inputs.sobreResidencia.areaDondeEstaraMascota}
                                            sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withPatio" checked={localState.applicantsResidences[0].withPatio} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.cuentaConPatio} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withGarden" checked={localState.applicantsResidences[0].withGarden} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.cuentaConJardin} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withTerrace" checked={localState.applicantsResidences[0].withTerrace} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.cuentaConTerraza} />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="coveredPetArea" checked={localState.applicantsResidences[0].coveredPetArea} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} 
                                                label={lang.adoptionForm.inputs.sobreResidencia.cuentaConZonaDescubierta} />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            {
                                localState.plansToChangeResidence && localState.knowYourNextResidence && localState.applicantsResidences.length === 2 ?
                                    <Grid item md={12}>
                                        <Box style={{ marginTop: "40px" }}>
                                            <Typography component="h1" variant="h5" sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                                {lang.adoptionForm.titles.sobreProximaResidencia}
                                                {/*lang.adoptionRequest.titles.datosPersonales*/}
                                            </Typography>
                                            <Grid container space={4}>
                                                <Grid item md={12}>
                                                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                                        {lang.adoptionForm.subtitles.sobreResidencia.sobrePropietario}
                                                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                                                    </Typography>
                                                    <Box>
                                                        <Grid container spacing={1}>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="ownHouse" checked={localState.applicantsResidences[1].ownHouse} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} 
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.soyPropietario}/>
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12} style={{ display: localState.applicantsResidences[1].ownHouse ? "none" : "block" }}>
                                                                <Box>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12}>
                                                                            <TextField 
                                                                            type={"text"} 
                                                                            name="homeownerName" 
                                                                            value={localState.applicantsResidences[1].homeownerName} 
                                                                            disabled={adminMode} error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerName : false} 
                                                                            helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerName ? "Valor Invalido" : null} 
                                                                            onChange={ChangeNextResidenceProperty} 
                                                                            label={lang.adoptionForm.inputs.sobreResidencia.nombrePropietario} 
                                                                            sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <TextField 
                                                                            type={"text"} 
                                                                            name="homeownerSurname" 
                                                                            value={localState.applicantsResidences[1].homeownerSurname} 
                                                                            disabled={adminMode} 
                                                                            error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerSurname : false} 
                                                                            helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerSurname ? "Valor Invalido" : null} 
                                                                            onChange={ChangeNextResidenceProperty} 
                                                                            label={lang.adoptionForm.inputs.sobreResidencia.apellidoPropietario} 
                                                                            sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <TextField 
                                                                            type={"text"} 
                                                                            name="homeownerPhoneNumber" 
                                                                            value={localState.applicantsResidences[1].homeownerPhoneNumber} 
                                                                            disabled={adminMode} 
                                                                            error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerPhoneNumber : false} 
                                                                            helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerPhoneNumber ? "Valor Invalido" : null} 
                                                                            onChange={ChangeNextResidenceProperty} 
                                                                            label={lang.adoptionForm.inputs.sobreResidencia.telefonoPropietario} 
                                                                            sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={12} sx={{ marginTop: "30px" }}>
                                                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                                        {lang.adoptionForm.subtitles.sobreResidencia.detallesVivienda}
                                                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                                                    </Typography>
                                                    <Box>
                                                        <Grid container spacing={1}>
                                                            <Grid item md={12}>
                                                                <TextField
                                                                    id="NextResidencesType"
                                                                    name="type"
                                                                    select
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.tipoVivienda}
                                                                    value={residenceTypesOptions.filter(e => {
                                                                        return e.value === localState.applicantsResidences[1].type
                                                                    })[0].value}
                                                                    onChange={ApplicantsNextResidenceTypeOnChange}
                                                                    SelectProps={{
                                                                        native: true,
                                                                    }}
                                                                    sx={{ width: "100%" }}
                                                                >
                                                                    {residenceTypesOptions.map((option, key) => (
                                                                        <option key={key} value={option.value}>
                                                                            {option.label}
                                                                        </option>
                                                                    ))}
                                                                </TextField>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <TextField 
                                                                type={"number"} 
                                                                name="petAreaDimension" 
                                                                min={0} 
                                                                value={localState.applicantsResidences[1].petAreaDimension} 
                                                                disabled={adminMode} 
                                                                error={formErrors.nextResidencePetArea} 
                                                                helperText={formErrors.nextResidencePetArea ? "Valor invalido" : null} 
                                                                onChange={ChangeNextResidenceProperty} 
                                                                label={lang.adoptionForm.inputs.sobreResidencia.areaDondeEstaraMascota} 
                                                                sx={{ width: "100%" }} />
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withPatio" checked={localState.applicantsResidences[1].withPatio} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} 
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.cuentaConPatio} />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withGarden" checked={localState.applicantsResidences[1].withGarden} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} 
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.cuentaConJardin} />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withTerrace" checked={localState.applicantsResidences[1].withTerrace} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} 
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.cuentaConTerraza} />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="coveredPetArea" checked={localState.applicantsResidences[1].coveredPetArea} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} 
                                                                    label={lang.adoptionForm.inputs.sobreResidencia.cuentaConZonaDescubierta}/>
                                                                </FormGroup>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={12}>

                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Grid> :
                                    null
                            }
                        </Grid>
                    </Paper>
                </Box>
            </Grid>



            {adminMode ? null : <Grid item xs={12}>
                <Box>
                    <Paper sx={{ padding: "20px" }}>
                        <Stack spacing={2}>
                            <Alert severity="warning">
                                {lang.adoptionForm.alerts.warningAprobacion}
                            </Alert>
                            <Alert severity="info">
                                {lang.adoptionForm.alerts.infoAprobacion}
                            </Alert>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>}
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                    {adminMode ? null : <Button onClick={CreateAdoptionRequest} variant="contained" color='yellowButton' size="big" sx={{ borderRadius: '20px', paddingLeft: 10, paddingRight: 10, fontSize: "20px", width: "300px" }} disabled={HaveErrors()}>
                            {lang.adoptionForm.buttons.enviar}</Button>}
                    {adminMode ?
                        <Button onClick={AuthorizeRequest} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px" }}>
                            {lang.adoptionForm.buttons.autorizar}</Button>
                        : null}
                    {adminMode ?
                        <Button onClick={RejectRequest} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>
                            {lang.adoptionForm.buttons.rechazar}</Button>
                        : null}
                    {adminMode ?
                        <Button onClick={RequestDataReview} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>
                            {lang.adoptionForm.buttons.solicitarRevision}</Button>
                        : null}
                </Box>
            </Grid>
        </Grid>
    </Container>
}

export default AdoptionRequestForm;
