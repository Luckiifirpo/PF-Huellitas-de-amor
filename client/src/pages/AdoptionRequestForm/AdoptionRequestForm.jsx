import { Autocomplete, Button, Checkbox, Container, FormControlLabel, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PersonalReference from "../../components/AdoptionRequestComponents/PersonalReference/PersonalReference";
import PreviousPet from "../../components/AdoptionRequestComponents/PreviousPet/PrevousPet";
import ResidencesTenant from "../../components/AdoptionRequestComponents/ResidencesTenant/ResidencesTenant";
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
    const currentUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const { pet_id } = useParams();
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
        { label: "none", value: "none", langKey: 'ninguno', index: 0 },
        { label: "technician", value: "technician", langKey: 'tecnico', index: 1 },
        { label: "technologist", value: "technologist", langKey: 'tecnologo', index: 2 },
        { label: "professional", value: "professional", langKey: 'profesional', index: 3 }
    ]

    const residenceTypesOptions = [
        { label: "single detached", value: "single-detached", langKey: "separada", index: 0 },
        { label: "semi detached", value: "semi-detached", langKey: "semiSeparada", index: 1 },
        { label: "duplex", value: "duplex", langKey: "duplex", index: 2 },
        { label: "in-building apartment", value: "in-building-apartment", langKey: "inBuildingApartment", index: 3 },
        { label: "movable dwelling", value: "movable dwelling", langKey: "movableDwelling", index: 4 }
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

    }

    const RequestDataReview = () => {

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

    }, [localState]);

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
                                Nuestras criaturas son muy valiosas para nosotros, por lo tanto nos tomamos muy en serio su bienenstar y las condiciones de vida que debe tener
                                junto a las personas con las que les permitimos compartir y convivir. <strong>Es por eso que te solicitamos encarecidamente que nos brindes la mayor informacion
                                    en los campos solicitados en el siguiente formulario.</strong>
                            </Alert>
                            <Alert severity="warning">
                                Si ingresas informacion falsa o irrelevante para este proceso, <strong>tu solicitud sera descartada de manera inmediata.</strong><br />
                                Si ingresas informacion que no podamos comprobar o si decides omitir informacion en este formulario, sera mas dificil realizar el proceso de aprobacion
                            </Alert>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>}
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
                                            <TextField type={"tel"} name="phoneNumber" error={formErrors.phoneNumber} helperText={formErrors.phoneNumber ? "Valor Invalido" : null} value={localState.phoneNumber} disabled={adminMode} onChange={ChangeBaseProperty} label={"Telefono celular"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"tel"} name="workplacePhoneNumber" error={formErrors.workplacePhoneNumber} helperText={formErrors.workplacePhoneNumber ? "Valor Invalido" : null} value={localState.workplacePhoneNumber} disabled={adminMode} onChange={ChangeBaseProperty} label={"Tel. Trabajo u Oficina"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="allergies" value={localState.allergies} disabled={adminMode} onChange={ChangeBaseProperty} label={"Alergias:"} placeholder={"Ninguna"} sx={{ width: "100%" }} />
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
                                                label={"Nivel Educativo:"}
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
                                            <TextField type={"text"} name="reasonForRequest" error={formErrors.reasonForRequest} helperText={formErrors.reasonForRequest ? "Valor Invalido" : null} value={localState.reasonForRequest} disabled={adminMode} onChange={ChangeBaseProperty} label={"Por que quieres adoptar esta mascota?"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="acceptsPeriodicVisits" onChange={ChangeBaseProperty} checked={localState.acceptsPeriodicVisits} disabled={adminMode} />} label="Estoy de acuerdo con que hagan visitas periodicas a mi residencia" />
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
                            {adminMode ? null : <Grid item md={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        Con la siguiente informacion, podremos saber si esta mascota es la que estas buscando, o si
                                        no, te ayudaremos a encontrar otra mascota indicada para ti. Entre mas datos nos proporciones
                                        mas facil sera concluir si esta es tu mascota.
                                    </Alert>
                                    <Alert severity="warning">
                                        Si decides omitir informacion que nos ayude a escoger el temperamento de tu proxima mascota,
                                        podrias toparte con situaciones inesperadas e indeseadas a la hora de interactuar con tu mascota.
                                    </Alert>
                                </Stack>
                            </Grid>}
                            <Grid item md={12}>
                                <Typography sx={{ fontWeight: 'Bold' }}>
                                    Imagina que ya tienes tu mascota. Cual seria tu reaccion frente a los siguientes comportamientos de tu mascota, o como reaccionas generalmente frente a este tipo de situaciones:
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withNoisyPet" value={localState.psychologicalData.withNoisyPet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota ruidosa:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withHyperactivePet" value={localState.psychologicalData.withHyperactivePet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota hiperactiva:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withCalmPet" value={localState.psychologicalData.withCalmPet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota muy calmada:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withNonObedientPet" value={localState.psychologicalData.withNonObedientPet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota desobediente:"} sx={{ width: "100%" }} />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withUnwantedPetWaste" value={localState.psychologicalData.withUnwantedPetWaste} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a los desechos indeseados de una mascota:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withAggressivePet" value={localState.psychologicalData.withAggressivePet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota agresiva:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withSmallPet" value={localState.psychologicalData.withSmallPet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota pequeña:"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <TextField type={"text"} name="withBigPet" value={localState.psychologicalData.withBigPet} disabled={adminMode} onChange={ChangeApplicantsPsychologicalData} label={"Frente a una mascota grande:"} sx={{ width: "100%" }} />
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
                            REFERENCIAS PERSONALES:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            {
                                formErrors.minPersonalReferences ?
                                    <Grid item md={12} sx={{ marginBottom: "10px" }}>
                                        <Stack>
                                            <Alert severity="error">
                                                Agrega por lo menos una referencia personal
                                            </Alert>
                                        </Stack>
                                    </Grid>
                                    : null
                            }
                            {adminMode ? null : <Grid item md={12}>
                                <Button onClick={AddPersonalReference} variant="outlined" size="small">Agregar</Button>
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
                            MASCOTAS ANTERIORES:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            {adminMode ? null : <Grid item md={12}>
                                <Button onClick={AddPreviousPet} variant="outlined" size="small">Agregar</Button>
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
                            INQUILINOS EN TU RESIDENCIA:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            <Grid item md={12}>
                                <TextField type={"number"} name="numberOfTenants" value={localState.numberOfTenants} disabled={adminMode} onChange={ChangeBaseProperty} label={"Numero de inquilinos:"} sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item md={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name="allTenantsAgreeToAdoption" onChange={ChangeBaseProperty} checked={localState.allTenantsAgreeToAdoption} disabled={adminMode} />} label="Todos estan de acuerdo con la adopcion" />
                                </FormGroup>
                            </Grid>
                            <Grid item md={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox name="childrenUnder10Years" onChange={ChangeBaseProperty} checked={localState.childrenUnder10Years} disabled={adminMode} />} label="Niños menores de 10 años" />
                                </FormGroup>
                            </Grid>
                            {adminMode ? null : <Grid item md={12}>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info">
                                        Con la siguiente informacion, podremos saber si esta mascota es la que estas buscando, o si
                                        no, te ayudaremos a encontrar otra mascota indicada para ti. Entre mas datos nos proporciones
                                        mas facil sera concluir si esta es tu mascota.
                                    </Alert>
                                    <Alert severity="warning">
                                        Si decides omitir informacion que nos ayude a escoger el temperamento de tu proxima mascota,
                                        podrias toparte con situaciones inesperadas e indeseadas a la hora de interactuar con tu mascota.
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
                            SOBRE TU RESIDENCIA:
                            {/*lang.adoptionRequest.titles.datosPersonales*/}
                        </Typography>
                        <Grid container space={4}>
                            <Grid item md={12}>
                                <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                    Sobre el propietaro:
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="ownHouse" checked={localState.applicantsResidences[0].ownHouse} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} label="Soy el propietario de esta vivienda" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12} style={{ display: localState.applicantsResidences[0].ownHouse ? "none" : "block" }}>
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        <TextField type={"text"} name="homeownerName" value={localState.applicantsResidences[0].homeownerName} disabled={adminMode} error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerName : false} helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerName ? "Valor Invalido" : null} onChange={ChangeCurrentResidenceProperty} label={"Nombre del propietario:"} sx={{ width: "100%" }} />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <TextField type={"text"} name="homeownerSurname" value={localState.applicantsResidences[0].homeownerSurname} disabled={adminMode} error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerSurname : false} helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerSurname ? "Valor Invalido" : null} onChange={ChangeCurrentResidenceProperty} label={"Apellido del propietario:"} sx={{ width: "100%" }} />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <TextField type={"text"} name="homeownerPhoneNumber" value={localState.applicantsResidences[0].homeownerPhoneNumber} disabled={adminMode} error={formErrors.currentResidenceOwner ? formErrors.currentResidenceOwner.homeownerPhoneNumber : false} helperText={formErrors.currentResidenceOwner && formErrors.currentResidenceOwner.homeownerPhoneNumber ? "Valor Invalido" : null} onChange={ChangeCurrentResidenceProperty} label={"Numero telefonico del propietario:"} sx={{ width: "100%" }} />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="plansToChangeResidence" checked={localState.plansToChangeResidence} disabled={adminMode} onChange={ChangeBaseProperty} />} label="Pienso mudarme en los proximos meses" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="knowYourNextResidence" onChange={ChangeBaseProperty} checked={localState.knowYourNextResidence} disabled={!localState.plansToChangeResidence} />} label="Ya conozco la vivienda donde me voy a mudar" />
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid item md={12} sx={{ marginTop: "30px" }}>
                                <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                    Detalles de tu vivienda:
                                    {/*lang.adoptionRequest.titles.datosPersonales*/}
                                </Typography>
                                <Box>
                                    <Grid container spacing={1}>
                                        <Grid item md={12}>
                                            <TextField
                                                id="ActualResidencesType"
                                                name="type"
                                                select
                                                label={"Tipo de vivienda:"}
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
                                            <TextField type={"number"} name="petAreaDimension" min={0} value={localState.applicantsResidences[0].petAreaDimension} disabled={adminMode} error={formErrors.currentResidencePetArea} helperText={formErrors.currentResidencePetArea ? "Valor invalido" : null} onChange={ChangeCurrentResidenceProperty} label={"Area donde estara frecuentemente tu mascota (en metros cuadrados):"} sx={{ width: "100%" }} />
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withPatio" checked={localState.applicantsResidences[0].withPatio} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} label="La vivienda cuenta con un patio" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withGarden" checked={localState.applicantsResidences[0].withGarden} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} label="La vivienda cuenta con un jardin" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="withTerrace" checked={localState.applicantsResidences[0].withTerrace} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} label="La vivienda cuenta con una terraza" />
                                            </FormGroup>
                                        </Grid>
                                        <Grid item md={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox name="coveredPetArea" checked={localState.applicantsResidences[0].coveredPetArea} disabled={adminMode} onChange={ChangeCurrentResidenceProperty} />} label="La vivienda cuenta con una zona descubierta" />
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
                                                SOBRE TU PROXIMA RESIDENCIA:
                                                {/*lang.adoptionRequest.titles.datosPersonales*/}
                                            </Typography>
                                            <Grid container space={4}>
                                                <Grid item md={12}>
                                                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                                        Sobre el propietaro:
                                                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                                                    </Typography>
                                                    <Box>
                                                        <Grid container spacing={1}>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="ownHouse" checked={localState.applicantsResidences[1].ownHouse} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} label="Soy el propietario de esta vivienda" />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12} style={{ display: localState.applicantsResidences[1].ownHouse ? "none" : "block" }}>
                                                                <Box>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item md={12}>
                                                                            <TextField type={"text"} name="homeownerName" value={localState.applicantsResidences[1].homeownerName} disabled={adminMode} error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerName : false} helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerName ? "Valor Invalido" : null} onChange={ChangeNextResidenceProperty} label={"Nombre del propietario:"} sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <TextField type={"text"} name="homeownerSurname" value={localState.applicantsResidences[1].homeownerSurname} disabled={adminMode} error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerSurname : false} helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerSurname ? "Valor Invalido" : null} onChange={ChangeNextResidenceProperty} label={"Apellido del propietario:"} sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                        <Grid item md={12}>
                                                                            <TextField type={"text"} name="homeownerPhoneNumber" value={localState.applicantsResidences[1].homeownerPhoneNumber} disabled={adminMode} error={formErrors.nextResidenceOwner ? formErrors.nextResidenceOwner.homeownerPhoneNumber : false} helperText={formErrors.nextResidenceOwner && formErrors.nextResidenceOwner.homeownerPhoneNumber ? "Valor Invalido" : null} onChange={ChangeNextResidenceProperty} label={"Numero telefonico del propietario:"} sx={{ width: "100%" }} />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item md={12} sx={{ marginTop: "30px" }}>
                                                    <Typography sx={{ color: '#FF3041', fontWeight: 'Bold', marginBottom: "10px" }}>
                                                        Detalles de tu vivienda:
                                                        {/*lang.adoptionRequest.titles.datosPersonales*/}
                                                    </Typography>
                                                    <Box>
                                                        <Grid container spacing={1}>
                                                            <Grid item md={12}>
                                                                <TextField
                                                                    id="NextResidencesType"
                                                                    name="type"
                                                                    select
                                                                    label={"Tipo de vivienda:"}
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
                                                                <TextField type={"number"} name="petAreaDimension" min={0} value={localState.applicantsResidences[1].petAreaDimension} disabled={adminMode} error={formErrors.nextResidencePetArea} helperText={formErrors.nextResidencePetArea ? "Valor invalido" : null} onChange={ChangeNextResidenceProperty} label={"Area donde estara frecuentemente tu mascota (en metros cuadrados):"} sx={{ width: "100%" }} />
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withPatio" checked={localState.applicantsResidences[1].withPatio} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} label="La vivienda cuenta con un patio" />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withGarden" checked={localState.applicantsResidences[1].withGarden} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} label="La vivienda cuenta con un jardin" />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="withTerrace" checked={localState.applicantsResidences[1].withTerrace} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} label="La vivienda cuenta con una terraza" />
                                                                </FormGroup>
                                                            </Grid>
                                                            <Grid item md={12}>
                                                                <FormGroup>
                                                                    <FormControlLabel control={<Checkbox name="coveredPetArea" checked={localState.applicantsResidences[1].coveredPetArea} disabled={adminMode} onChange={ChangeNextResidenceProperty} />} label="La vivienda cuenta con una zona descubierta" />
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
                                La aprobacion de la presente solicitud de adopcion esta sujeta al nivel legislativo en materia de proteccion animal aplicable para tu zona, region o pais.
                                Tambien dependera de estudios que realizemos en tu zona de vivienda y areas aledañas, todo con la finalidad de garantizar una vida digna y de bienenstar a nuestras
                                apreciadas criaturas.
                            </Alert>
                            <Alert severity="info">
                                Al finalizar esta solicitud, estaremos contactandonos con usted via correo electronico, para agendar un espacio en su calendario, en el cual nos permita
                                realizar una visita a usted en su residencia.
                            </Alert>
                        </Stack>
                    </Paper>
                </Box>
            </Grid>}
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "100px" }}>
                    {adminMode ? null : <Button onClick={CreateAdoptionRequest} variant="contained" color='yellowButton' size="big" sx={{ borderRadius: '20px', paddingLeft: 10, paddingRight: 10, fontSize: "20px", width: "300px" }} disabled={HaveErrors()}>{"Enviar"}</Button>}
                    {adminMode ?
                        <Button onClick={AuthorizeRequest} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px" }}>{"Autorizar"}</Button>
                        : null}
                    {adminMode ?
                        <Button onClick={RejectRequest} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Rechazar"}</Button>
                        : null}
                    {adminMode ?
                        <Button onClick={RequestDataReview} variant="contained" color='yellowButton' size="small" sx={{ borderRadius: '20px', paddingLeft: 5, paddingRight: 5, fontSize: "20px", marginLeft: "5px" }}>{"Solicitar revision de datos"}</Button>
                        : null}
                </Box>
            </Grid>
        </Grid>
    </Container>
}

export default AdoptionRequestForm;