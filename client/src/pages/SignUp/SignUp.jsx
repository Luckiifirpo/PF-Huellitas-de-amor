import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import logo from "../../assets/image/logo.svg";
import sign_up_img from "../../assets/image/sign-up-img.png";
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { createUsers } from "../../redux/userReducer";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string('Enter your email')
        .required('Email is required'),
    surname: yup
        .string('Enter your email')
        .required('Email is required'),
    age: yup
        .string('Enter your email')
        .required('Email is required'),
    direction: yup
        .string('Enter your email')
        .required('Email is required'),
    work: yup
        .string('Enter your email')
        .required('work is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const SignUp = (props) => {

    const initialValues = {
        name: '',
        surname: '',
        age: '',
        direction: '',
        email: '',
        work:'',
        password: ''
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm} ) => { 
            dispatch(createUsers(values))
            resetForm()
            setTimeout(()=>{
                navigate('/iniciar-sesion')
            },1000)
        },
    });


    return (
        <div>
            <Container style={{ marginBottom: 30, marginTop: 30 }} >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item lg={7}>
                            <img src={sign_up_img} />
                        </Grid>
                        <Grid item lg={1}>

                        </Grid>
                        <Grid item lg={4}>
                            <Paper style={{ paddingBottom: 20 }}>
                                <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                    <Grid item>
                                        <img className={style.logo} src={logo} />
                                    </Grid>
                                    <Grid item>
                                        <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                            Registrate
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                            size="small" 
                                            label="Nombre" 
                                            id="name"
                                            name="name" 
                                            variant="standard"          
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            className={style.input_width} />
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                        size="small" 
                                        id="last-name-input" 
                                        label="Apellido" 
                                        variant="standard" 
                                        name="surname"
                                        value={formik.values.surname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                                        helperText={formik.touched.surname && formik.errors.surname}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                        type="number" 
                                        size="small" 
                                        id="last-name-input" 
                                        label="Edad" 
                                        variant="standard" 
                                        name="age"      
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        error={formik.touched.age && Boolean(formik.errors.age)}
                                        helperText={formik.touched.age && formik.errors.age}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                        size="small" 
                                        id="address-input" 
                                        label="Direccion" 
                                        variant="standard" 
                                        name="direction"      
                                        value={formik.values.direction}
                                        onChange={formik.handleChange}
                                        error={formik.touched.direction && Boolean(formik.errors.direction)}
                                        helperText={formik.touched.direction && formik.errors.direction}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item>
                                        <TextField 
                                        type="email" 
                                        size="small" 
                                        id="email-input" 
                                        label="Correo" 
                                        variant="standard" 
                                        name="email"      
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        className={style.input_width} />
                                    </Grid>
                                    <FormControl
                                         
                                    >
                                        <FormHelperText
                                        error={formik.touched.work && Boolean(formik.errors.work)}
                                        >
                                        {formik.touched.work && formik.errors.work}
                                        </FormHelperText>
                                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ marginTop: "25px" }}>¿Tienes trabajo?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="work"
                                            value={formik.values.work} 
                                            onChange={formik.handleChange}
                                           
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label="Si" />
                                            <FormControlLabel value={false} control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </FormControl>

                    
                                    <Grid item>
                                        <TextField 
                                        size="small" 
                                        id="contraseña-input" 
                                        label="Contraseña" 
                                        type="password" 
                                        variant="standard" 
                                        name="password"      
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" type="submit" color='info' size="large" sx={{ borderRadius: '20px', marginTop: 8 }} className={style.input_width}>Crear Cuenta</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default SignUp;