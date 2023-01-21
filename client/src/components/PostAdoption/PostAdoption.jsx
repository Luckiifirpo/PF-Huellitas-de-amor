import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import style from './PostAdoption.module.css'
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddAPhotoTwoToneIcon from '@mui/icons-material/AddAPhotoTwoTone';
import ImagePostAdoption from '../../assets/image/fondoPostAdoption.png';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useFormik } from 'formik';
import { createAnimalPost } from "../../redux/animalsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import * as yup from 'yup';

const PostAdoption = () => {
/**********************************************************/
/*Todas estas lineas se agregaron para que funcione la subida de imagenes
a cloudinary, esto se tiene que modificar ya que cloud_name y preset deben estar
en un archivo .env, momentaneamente lo dejo asi para que puedan probar si gustan.

Al momento de pasar a producción hay que eliminar los console.log

También se modificaria cuando se añadan las actions y el reducer, ya que es ahi
en donde debe hacerse para enviar el post a /animals */
    const [file, setFile] = useState(null)

    const cloud_name = 'dydncradb';
    const preset = 'qeohapyd';

    const upload = async (e) => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`

    const formData = new FormData();
    formData.append('upload_preset', `${preset}`)
    formData.append('file', file);

    try {
        const res = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) return null;

        const data = await res.json();
        console.log({urldelaimage: data.url})
        return data.secure_url;

    } catch (error) {
        console.log({error});
    }
};
/**********************************************************/

/***********************************************************/
/*Aca intente hacer la funcionalidad de dar animales en adopcion, pero tengo que irme y
 no llego a terminarla por ahora, en caso de que quieran ver esto, 
 pueden hacer una rama nueva para usar estos avances y fijarse si consiguen hacerlo funcionar

Agregué las validaciones correspondientes, aunque no me fio mucho de si están bien,
la mayoria de cosas copie lo de SignUp y me guié un poco de eso y de google
También agregué los name, value, onChange, error y helperText en cada input!

El tema es que no consigo que despache la acción, probablemente sea algun fallo que tengo yo
 en el reducer o en algo de redux, y también habria que mover la funcionalidad de subir la imagen a cloudinary
 para poder despachar la acción de postear un animal*/
const validationSchema = yup.object({
    name: yup
        .string('Enter the animal name')
        .required('Name is required'),
    dateOfPublication: yup
        .date('Enter the date of publication')
        .default(function(){return new Date()})
        .required('Date is required'),
    specie: yup
        .string('Enter the animal specie')
        .required('Specie is required'),
    age: yup
        .number('Enter the animal age')
        .positive()
        .integer()
        .required('Age of the animal is required'),
    weight: yup
        .number('Enter the animal weight')
        .positive()
        .integer()
        .required('Weight is required'),
    image: yup
        .string('Enter the animal image')
        .required('A image is required'),
    size: yup
        .string('Enter the animal size')
        .required('Size is required'),
    gender: yup
        .string('Enter the animal gender')
        .required('Gender is required'),  
    breed: yup
        .string('Enter the animal breed')
        .required('Breed is required'),    
    description: yup
        .string('Enter the animal description')
        .required('Description is required'),  
});

const initialValues = {
    name: '',
    dateOfPublication: '',
    specie: '',
    age: '',
    weight: "",
    image:"",
    size: '',
    gender: '',
    breed: '',
    description: '',
}

const dispatch = useDispatch()
const navigate = useNavigate()

const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values,{resetForm} ) => { 
        dispatch(createAnimalPost(values))
        resetForm()
        setTimeout(()=>{
            navigate('/adopciones')
        },1000)
    },
});
/***********************************************************/
/***********************************************************/
  return (
    <>
        <Box className={style.gridContact} sx={{marginBottom:'300px'}}>
            <Box className={style.gridContactImage}>
            <img src={ImagePostAdoption} alt="" />
            </Box>
            <Container sx={{height:'100%'}}>
                <form onSubmit={formik.handleSubmit}>

                <Grid 
                container
                justifyContent="center"
                alignItems="center"
                sx={{height:'100%'}}
                >
                <Grid md={12}>
                    <Typography component="h1" variant="h3" align='center' sx={{color:'#FF3041', textTransform:'uppercase', fontWeight:'700', marginTop:'200px'}}>
                            Dar en adopcion
                    </Typography>
                </Grid>
                <Grid item md={6} >
                    <Box 
                    component="form" 
                    onSubmit={formik.handleSubmit} 
                    sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:' 0 20px 0 150px'}}>
                    <TextField 
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
                        label="Fecha de publicación:" 
                        variant="standard"
                        name="dateOfPublication"
                        value={formik.values.dateOfPublication}
                        onChange={formik.handleChange}
                        error={formik.touched.dateOfPublication && Boolean(formik.errors.dateOfPublication)}
                        helperText={formik.touched.dateOfPublication && formik.errors.dateOfPublication}
                    />
                    <TextField 
                        label="Especie:" 
                        variant="standard" 
                        name="specie"
                        value={formik.values.specie}
                        onChange={formik.handleChange}
                        error={formik.touched.specie && Boolean(formik.errors.specie)}
                        helperText={formik.touched.specie && formik.errors.specie}
                    />
                    <TextField 
                        type="number"
                        label="Edad:" 
                        variant="standard" 
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
                        name="weight"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                        helperText={formik.touched.weight && formik.errors.weight}
                    />
                    </Box>
                </Grid>
                <Grid item md={6} >
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden 
                            accept="image/*" 
                            type="file" 
                            name="image"
                            value={formik.values.image}
                            helperText={formik.touched.image && formik.errors.image}
                            onChange={(e) => setFile(e.target.files[0])} 
                            />
                        <PhotoCamera />
                    </IconButton>
                    {/* La linea de abajo genera una preview de la imagen que se eligió para subir,
                     si quieren implementarlo quedaria bastante bien, yo no lo hago porque me da miedo el mui jajajaj*/}
                    {/* { file ? <img alt="Preview" height="60" src={URL.createObjectURL(file)} /> : null } */}
                    <Box component="form" sx={{display:'flex',flexDirection:'column', gap:'15px', justifyContent:'center',height:'100%', margin:' 0 150px 0 20px'}}>
                    <TextField 
                        label="Tamaño:" 
                        variant="standard" 
                        name="size"
                        value={formik.values.size}
                        onChange={formik.handleChange}
                        error={formik.touched.size && Boolean(formik.errors.size)}
                        helperText={formik.touched.size && formik.errors.size}
                    />
                    <TextField 
                        label="Género:" 
                        variant="standard" 
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                    />
                    <TextField 
                        label="Raza:" 
                        variant="standard" 
                        name="breed"
                        value={formik.values.breed}
                        onChange={formik.handleChange}
                        error={formik.touched.breed && Boolean(formik.errors.breed)}
                        helperText={formik.touched.breed && formik.errors.breed}
                    />
                    <TextField 
                        label="Desripción:" 
                        variant="standard" 
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    </Box>
                </Grid>
                <Button variant="contained" type="submit" color='info' size="large" sx={{borderRadius:'20px', padding:'9px 150px'}}>
                    Publicar
                </Button>
                </Grid>
                </form>
            </Container>
        </Box>
      </>
  )
}

export default PostAdoption