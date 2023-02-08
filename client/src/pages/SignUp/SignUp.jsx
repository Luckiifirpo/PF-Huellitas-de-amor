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
import { postUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import style from "./SignUp.module.css";
import { useEffect } from "react";


const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    name: yup
        .string('Enter your name')
        .required('name is required'),
    surname: yup
        .string('Enter your surname')
        .required('surname is required'),
    age: yup
        .string('Enter your age')
        .required('age is required'),
    direction: yup
        .string('Enter your address')
        .required('address is required'),
    hasAJob: yup
        .string('Are yoe working?')
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
        hasAJob:'',
        password: ''
    }

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const lang = useSelector((state) => state.lang.currentLangData);
    const currentUser = useSelector((state) => state.users.currentUser);

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm} ) => { 
            dispatch(postUser(values))
            resetForm();
        },
    });

    useEffect(() => {
        if(currentUser){
            navigate('/')
        }
    }, [currentUser]);

    return (
        <div className={style.sign_up_div} >
            <Container style={{minHeight:"100vh", display: "flex", width:"100%"}} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <form onSubmit={formik.handleSubmit} style={{display: "flex"}}>
                    <Grid container spacing={4} alignItems="center" sx={{padding:"80px"}} >
                        <Grid item lg={7} sx={{display:{lg:"block",xs:"none"}}}>
                            <img src={sign_up_img} />
                        </Grid>
                        <Grid item lg={1}>

                        </Grid>
                        <Grid item lg={4}  md={8}>
                            <Paper style={{ paddingBottom: 20 }}>
                                <Grid container spacing={2} flexDirection={"column"} alignItems={"center"}>
                                    <Grid item sx={{width:"100%"}} >
                                        <img className={style.logo} src={logo} />
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <Typography component="h1" sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                            {lang.registrarse.titles.registrate}
                                        </Typography>
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <TextField 
                                            sx={{width:"100%"}}
                                            size="small" 
                                            label={lang.registrarse.inputs.nombre + ":"} 
                                            id="name"
                                            name="name" 
                                            variant="standard"          
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                            helperText={formik.touched.name && formik.errors.name}
                                            className={style.input_width} />
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <TextField 
                                       sx={{width:"100%"}}
                                        size="small" 
                                        id="last-name-input" 
                                        label={lang.registrarse.inputs.apellido + ":"}  
                                        variant="standard" 
                                        name="surname"
                                        value={formik.values.surname}
                                        onChange={formik.handleChange}
                                        error={formik.touched.surname && Boolean(formik.errors.surname)}
                                        helperText={formik.touched.surname && formik.errors.surname}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <TextField 
                                        sx={{width:"100%"}}
                                        type="number" 
                                        size="small" 
                                        id="last-name-input" 
                                        label={lang.registrarse.inputs.edad + ":"} 
                                        variant="standard" 
                                        name="age"      
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        error={formik.touched.age && Boolean(formik.errors.age)}
                                        helperText={formik.touched.age && formik.errors.age}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <TextField 
                                        sx={{width:"100%"}}
                                        size="small" 
                                        id="address-input" 
                                        label={lang.registrarse.inputs.direccion + ":"} 
                                        variant="standard" 
                                        name="direction"      
                                        value={formik.values.direction}
                                        onChange={formik.handleChange}
                                        error={formik.touched.direction && Boolean(formik.errors.direction)}
                                        helperText={formik.touched.direction && formik.errors.direction}
                                        className={style.input_width} />
                                    </Grid>
                                    <Grid item sx={{width:"100%"}}>
                                        <TextField 
                                        sx={{width:"100%"}}
                                        type="email" 
                                        size="small" 
                                        id="email-input" 
                                        label={lang.registrarse.inputs.correo + ":"}  
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
                                        error={formik.touched.hasAJob && Boolean(formik.errors.hasAJob)}
                                        >
                                        {formik.touched.hasAJob && formik.errors.hasAJob}
                                        </FormHelperText>
                                        <FormLabel id="demo-row-radio-buttons-group-label" sx={{ marginTop: "25px" }}>{lang.registrarse.inputs.tienesTrabajo}</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="hasAJob"
                                            value={formik.values.hasAJob} 
                                            onChange={formik.handleChange}
                                           
                                        >
                                            <FormControlLabel value={true} control={<Radio />} label={lang.registrarse.inputs.si} />
                                            <FormControlLabel value={false} control={<Radio />} label={lang.registrarse.inputs.no} />
                                        </RadioGroup>
                                    </FormControl>

                    
                                    <Grid item>
                                        <TextField 
                                        size="small" 
                                        id="contraseña-input" 
                                        label={lang.registrarse.inputs.contraseña} 
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
                                        <Button variant="contained" type="submit" color='yellowButton' size="large" sx={{ borderRadius: '20px', marginTop: 8 }} className={style.input_width}>{lang.registrarse.buttons.crearCuenta}</Button>
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