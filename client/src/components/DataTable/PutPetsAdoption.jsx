import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import style from "./PutPetsAdoption.module.css";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import ImagePostAdoption from "../../assets/image/fondoPostAdoption.png";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { postPet } from "../../redux/slices/petsSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Paper,
} from "@mui/material";
import { setError } from "../../redux/slices/errorsSlice";
import ErrorManager from "../../resources/ErrorManager";
import { setToGoAfterLogin } from "../../redux/slices/navigationSlice";
import { useEffect } from "react";

const validationSchema = yup.object({
  name: yup.string("Enter Dogs name").required("El nombre es obligatorio"),
  date: yup.string("Publication Date").required("fecha es obligatoria"),
  species: yup.string("pet Species").required("Especie es obligatoria"),
  age: yup.string("Enter pet age").required("edad es obligatoria").default(0),
  weight: yup
    .string("Enter pet weight")
    .required("Peso es obligatorio")
    .default(0),
  size: yup.string("Enter pet size").required("tamaño es obligatorio"),
  gender: yup.string("Enter pet gender").required("Genero es obligatorio"),
  breed: yup.string("Enter pet breed").required("raza es obligatorio"),
  description: yup
    .string("Describe your pet")
    .default("Descripcion de mascota"),
});

const speciesArray = [
  {
    value: "feline",
    label: "Felino",
  },
  {
    value: "canine",
    label: "Canino",
  },
  {
    value: "fish",
    label: "Pez",
  },
  {
    value: "rodent",
    label: "Roedor",
  },
  {
    value: "equine",
    label: "Equino",
  },
  {
    value: "bovine",
    label: "Bovino",
  },
  {
    value: "ovine",
    label: "Ovino",
  },
  {
    value: "goat",
    label: "Caprino",
  },
  {
    value: "other",
    label: "Otro",
  },
];

const sizesArray = [
  {
    value: "small",
    label: "Pequeño",
  },
  {
    value: "medium",
    label: "Mediano",
  },
  {
    value: "big",
    label: "Grande",
  },
];
const genderArray = [
  {
    value: "female",
    label: "Hembra",
  },
  {
    value: "male",
    label: "Macho",
  },
];

const ageTimeArray = [
  {
    value: "months",
    label: "Meses",
  },
  {
    value: "years",
    label: "Años",
  },
]

const PutAdoption = (props) => {
  const initialValues = {
    name: "",
    date: "",
    species: "canine",
    age: 0,
    ageTime: "years",
    weight: 0,
    size: "small",
    gender: "female",
    breed: "",
    description: "",
  };
 
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentPets = useSelector((state) => state.petsList);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      uploadData(values, resetForm);
    },
  });
  /**********************************************************/
  /*Todas estas lineas se agregaron para que funcione la subida de imagenes
a cloudinary, esto se tiene que modificar ya que cloud_name y preset deben estar
en un archivo .env, momentaneamente lo dejo asi para que puedan probar si gustan.

Al momento de pasar a producción hay que eliminar los console.log

También se modificaria cuando se añadan las actions y el reducer, ya que es ahi
en donde debe hacerse para enviar el post a /animals */
  const [file, setFile] = useState(null);
  const [uploadingData, setUploadingData] = useState(false);
  const [finishedUploadStatus, setFinishedUploadStatus] = useState({
    visible: false,
    title: "",
    message: "",
  });

  const cloud_name = "dydncradb";
  const preset = "qeohapyd";

  const handleFinishedDialogClose = (event) => {
    setFinishedUploadStatus({
      visible: false,
      title: "",
      message: "",
    });
  };

  const uploadData = async (values, resetForm) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", `${preset}`);
    formData.append("file", file);

    setUploadingData(true);

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        setUploadingData(false);
        dispatch(
          setError(
            ErrorManager.CreateErrorInfoObject(
              {
                name: "CloudinaryUploadImageError",
                code: "Unknown",
              },
              []
            )
          )
        );
        return null;
      }

      const data = await res.json();
      dispatch(
        postPet({
          ...values,
          image: data.secure_url,
        })
      );
      setUploadingData(false);
      setFinishedUploadStatus({
        visible: true,
        title: "Subida correcta de datos",
        message:
          "tus datos se han subido correctamente a nuestra base de datos",
      });
    } catch (error) {
      console.log({ error });
    }
  };
  /**********************************************************/

  // useEffect(() => {
  //   if(!currentUser){
  //     dispatch(setToGoAfterLogin("/dar-en-adopcion"));
  //     navigate("/iniciar-sesion");
  //   }
  // }, [currentUser]);

  useEffect(()=>{
    if(params.id){
      setPetDescription(currentPets.find((pets)=>pets.id === params.id))
      console.log(currentPets)
    }
  },[])

  return (
    <>
      <Box className={style.gridContact} sx={{ marginBottom: "30px", marginTop:"50px" }}>

        <Container sx={{ }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
             
            >
           
              <Grid item md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    height: "100%",
                    margin: " 0 20px 0 20px",
                  }}
                >
                  <TextField
                    id="name"
                    label="Nombre:"
                    variant="standard"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    type="date"
                    variant="standard"
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                  />
                  <TextField
                    id="species"
                    select
                    label="Especie"
                    value={formik.values.species}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={formik.handleChange}
                    error={formik.touched.species && Boolean(formik.errors.species)}
                    helperText={formik.touched.species && formik.errors.species}
                    variant="standard"
                  >
                    {speciesArray.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <Box sx={{
                    display: "flex",
                  }}>
                    <TextField
                      sx={{
                        width: "300px !important",
                        marginRight: "30px"
                      }}
                      type="number"
                      label="Edad:"
                      variant="standard"
                      id="age"
                      name="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      error={formik.touched.age && Boolean(formik.errors.age)}
                      helperText={formik.touched.age && formik.errors.age}
                    />
                    <TextField
                      type="number"
                      select
                      label="Rango:"
                      variant="standard"
                      id="ageTime"
                      name="ageTime"
                      value={formik.values.ageTime}
                      SelectProps={{
                        native: true,
                      }}
                      onChange={formik.handleChange}
                      error={formik.touched.ageTime && Boolean(formik.errors.ageTime)}
                      helperText={formik.touched.ageTime && formik.errors.ageTime}
                    >{ageTimeArray.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}</TextField>
                  </Box>
                  <TextField
                    type="number"
                    label="Peso:"
                    variant="standard"
                    id="weight"
                    name="weight"
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.weight && Boolean(formik.errors.weight)
                    }
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </Box>
              </Grid>
              <Grid item md={6}>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    accept="image/*"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <PhotoCamera />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    height: "100%",
                    margin: " 5px 20px 0 20px",
                  }}
                >
                  <TextField
                    id="size"
                    select
                    label="Tamaño"
                    value={formik.values.size}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={formik.handleChange}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                    variant="standard"
                  >
                    {sizesArray.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    id="gender"
                    name="gender"
                    select
                    label="Género"
                    value={formik.values.gender}
                    SelectProps={{
                      native: true,
                    }}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
                    helperText={formik.touched.gender && formik.errors.gender}
                    variant="standard"
                  >
                    {genderArray.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    label="Raza:"
                    variant="standard"
                    id="breed"
                    name="breed"
                    value={formik.values.breed}
                    onChange={formik.handleChange}
                    error={formik.touched.breed && Boolean(formik.errors.breed)}
                    helperText={formik.touched.breed && formik.errors.breed}
                  />
                  <TextField
                    label="Descripción:"
                    variant="standard"
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Box>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="info"
                size="large"
                sx={{ borderRadius: "20px", padding: "9px 150px", marginTop:"60px" }}
              >
                Actualizar
              </Button>
            </Grid>
          </form>
        </Container>
      </Box>
      <Modal
        open={uploadingData}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            padding: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Subiendo tus datos
          </Typography>
          <CircularProgress />
        </Paper>
      </Modal>
      <Dialog
        open={finishedUploadStatus.visible}
        onClose={handleFinishedDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {finishedUploadStatus.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {finishedUploadStatus.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFinishedDialogClose} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PutAdoption;
