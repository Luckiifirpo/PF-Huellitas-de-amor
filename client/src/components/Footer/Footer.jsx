import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import style from "./Footer.module.css";
import logoBlanco from "../../assets/image/logoBlanco.svg";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import { postContactUs } from "../../redux/slices/contactUsSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string("email required").email().required("email required"),
});

const Footer = () => {
  const initialValues = {
    name: "NewsLetter",
    email: "",
    description: "Bienvenido",
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
  const uploadData = async (values, resetForm) => {
    try {
      dispatch(
        postContactUs({
          ...values,
        })
      );
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <Box
      className={style["bg-footer"]}
      style={{ position: "relative", zIndex: 1 }}
    >
      <Container>
        <Grid container justifyContent="space-between" className={style.footer}>
          <Grid item md={3}>
            <Box>
              <Typography component={Link} to="/">
                Inicio
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1.5 }}>
              <Typography component={Link} to="/quienes-somos">
                Quienes Somos
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box>
              <Typography component={Link} to="/adopciones">
                Adopciones
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1.5 }}>
              <Typography component={Link} to="/donaciones">
                Donaciones
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Box>
              <Typography component={Link} to="/contacto">
                Contacto
              </Typography>
            </Box>
            <Box sx={{ marginTop: 1.5, display: "flex" }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  id="email"
                  label="Email para Huellitas Newsletter"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  color="warning"
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ backgroundColor: "#FFAB13" }}
                >
                  Inscribirse
                </Button>
              </form>
              {/* <TextField id="outlined-basic" label="Tu email" variant="outlined" className={style.newsletter} sx={{backgroundColor:"rgba(255,255,255, 18%)"}} color="warning"/>  */}
            </Box>
          </Grid>
          <Grid item md={3}>
            <img src={logoBlanco} alt="logo en blanco" className={style.logo} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
