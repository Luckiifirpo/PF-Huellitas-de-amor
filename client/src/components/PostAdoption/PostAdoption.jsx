import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import style from "./PostAdoption.module.css";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddAPhotoTwoToneIcon from "@mui/icons-material/AddAPhotoTwoTone";
import * as yup from "yup";
import ImagePostAdoption from "../../assets/image/fondoPostAdoption.png";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { postPet } from "../../redux/slices/petsSlice";
import { useNavigate } from "react-router-dom";

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
const PostAdoption = (props) => {
  const initialValues = {
    name: "",
    date: "",
    species: "",
    age: 0,
    weight: 0,
    size: "",
    gender: "",
    breed: "",
    description: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const cloud_name = "dydncradb";
  const preset = "qeohapyd";

  const uploadData = async (values, resetForm) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", `${preset}`);
    formData.append("file", file);

    try {
      const res = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) return null;

      const data = await res.json();
      dispatch(postPet({
        ...values,
        image: data.secure_url
      }));
      resetForm();
      setTimeout(() => {
        navigate("/dar-en-adopcion");
      }, 1000);

    } catch (error) {
      console.log({ error });
    }
  };
  /**********************************************************/
  return (
    <>
      <Box className={style.gridContact} sx={{ marginBottom: "300px" }}>
        <Box className={style.gridContactImage}>
          <img src={ImagePostAdoption} alt="" />
        </Box>

        <Container sx={{ height: "100%" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Grid md={12}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  sx={{
                    color: "#FF3041",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    marginTop: "200px",
                  }}
                >
                  Dar en adopcion
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    height: "100%",
                    margin: " 0 20px 0 150px",
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
                    label="Especie:"
                    variant="standard"
                    id="species"
                    name="species"
                    value={formik.values.species}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.species && Boolean(formik.errors.species)
                    }
                    helperText={formik.touched.species && formik.errors.species}
                  />
                  <TextField
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
                {/* La linea de abajo genera una preview de la imagen que se eligió para subir,
                     si quieren implementarlo quedaria bastante bien, yo no lo hago porque me da miedo el mui jajajaj*/}
                {/* { file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)} /> : null } */}
                <Box
                  component="form"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    justifyContent: "center",
                    height: "100%",
                    margin: " 0 150px 0 20px",
                  }}
                >
                  <TextField
                    label="Tamaño:"
                    variant="standard"
                    id="size"
                    name="size"
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                  />
                  <TextField
                    label="Género:"
                    variant="standard"
                    id="gender"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}
                  />
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
                sx={{ borderRadius: "20px", padding: "9px 150px" }}
              >
                Publicar
              </Button>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default PostAdoption;
