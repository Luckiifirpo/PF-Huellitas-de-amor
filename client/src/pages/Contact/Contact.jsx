import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import style from "./Contact.module.css";
import TextField from "@mui/material/TextField";
import ImageContact from "../../assets/image/fondocontacto.png";
import * as yup from "yup";
import { useFormik } from "formik";
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
import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { postContactUs } from "../../redux/slices/contactUsSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const validationSchema = yup.object({
  name: yup.string("Name required").required("Nombre requerido"),
  email: yup.string("Email Required").email().required("Correo requerido"),
  description: yup
    .string("Description required")
    .required("Descripcion requerida"),
});

const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    description: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang.currentLangData);
  // const currentUser = useSelector((state) => state.users.currentUser);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      uploadData(values, resetForm);
    },
  });

  const uploadData = async (values, resetForm) => {

    try {
      dispatch(
        postContactUs({
          ...values,
        })
      );
      resetForm();
      setTimeout(() => {
        navigate("/contacto");
      }, 1000);
    } catch (error) {
      console.log({ error });
    }
  };
  /**********************************************************/
   
  useEffect(() => {

  }, [lang]);
 
  return (
    <>
      <Box
        className={style.gridContact}
        sx={{ marginBottom: "300px", marginTop:{xs:"0px",md:"150px"}}}
      >
        <Box className={style.gridContactImage} sx={{display:{md:"block",xs:"none"}}}>
          <img src={ImageContact} alt="" />
        </Box>

        <Container sx={{ height: "100%" }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ height: "100%", flexDirection:"column" }}
            >
              <Grid item md={12}>
                <Typography
                  component="h1"
                  variant="h3"
                  align="center"
                  sx={{
                    color: "#FF3041",
                    textTransform: "uppercase",
                    fontWeight: "700",
                    marginTop:{xs:"100px",sm:"150px",md:"200px"},
                  }}
                >
                  {lang.contacto.titles.contactanos}
                </Typography>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  justifyContent: "center",
                  height: "100%",
                  margin: " 0 20px 0 35px",
                }}
              >
                <TextField
                  id="name"
                  label={lang.contacto.inputs.nombre + ":"}
                  variant="standard"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  label={lang.contacto.inputs.correo + ":"}
                  variant="standard"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  label={lang.contacto.inputs.descripcion + ":"}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="yellowButton"
                  size="large"
                  sx={{
                    borderRadius: "20px",
                    padding: "9px 150px",
                    marginTop: "50px",
                  }}
                >
                  {lang.contacto.buttons.enviar}
                </Button>
              </Box>
              {/* </Grid> */}
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Contact;

{/* <>
  <Box className={style.gridContact} marginTop={"110px"}>
    <Box className={style.gridContactImage}>
      <img src={ImageContact} alt="" />
    </Box>
    <Container sx={{ height: "100%" }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item md={6}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              justifyContent: "center",
              height: "100%",
              margin: "0px 70px",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              CONTACTANOS
            </Typography>
            <TextField label="Nombre" variant="standard" />
            <TextField label="Correo" variant="standard" />
            <TextField label="Mensaje" variant="standard" />

            <Button
              variant="contained"
              color="info"
              size="large"
              sx={{ borderRadius: "20px", marginTop: "30px" }}
            >
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
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
</>; */}
