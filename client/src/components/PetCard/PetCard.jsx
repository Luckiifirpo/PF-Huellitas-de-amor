import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import style from "./PetCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, setFavorites, getFavorites } from "../../redux/slices/adoptionSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect,useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";



const PetCard = (props) => {

    const { data, modeAction} = props;
    const [toggle, setToggle] = useState(false)
    const [open, setOpen] = useState(false);
    const [openRemove, setOpenRemove] = useState(false);
    const dispatch = useDispatch()
    const petsData = useSelector( state => state.adoptions.favoritesPets);
    const lang = useSelector((state) => state.lang.currentLangData);
    const handleFavorites = () => {
        setToggle( state => !state)
        if (!toggle) {
            setOpen(true)
            dispatch(setFavorites(data))
            return
        }
        setOpen(false)
        setOpenRemove(true)
        dispatch(deleteFavorite(data.id))
        dispatch(getFavorites())
    }
    const handleDeleteFavorite = () => {
        dispatch(deleteFavorite(data.id))
        dispatch(getFavorites())
    }
    useEffect(()=>{
        dispatch(getFavorites())
    },[dispatch, lang])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
        setOpenRemove(false)
    };

    return (
        <Card className={style.card} sx={{ width: "100%", height: "100%" }}>
            <CardActionArea>
                <Link to={"/pet_info/" + data.id}>
                    <CardHeader avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label={data ? data.name : ""}>
                            {
                                data ? data.name[0].toUpperCase() : null
                            }
                        </Avatar>
                    }
                        title={
                            <h3 style={{ margin: 0 }}>{data ? data.name : ""}</h3>
                        }
                        subheader={data.date.replace(/[-]/g, "/")}>
                    </CardHeader>
                    <CardMedia component="img"
                        sx={{ height: 194 }}
                        image={data ? data.img : ""}
                        alt={(data ? data.name : "") + " image"}>
                    </CardMedia>
                    <CardContent style={{ paddingBottom: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {
                                data ? data.description : null
                            }
                        </Typography>
                        <ul className={style.additional_info}>
                            <li><span style={{ fontWeight: "bold" }}>{lang.petCard.labels.edad}: </span><span>{data.age} {lang.petCard.labels[data.ageTime]}</span></li>
                            <li><span style={{ fontWeight: "bold" }}>{lang.petCard.labels.genero}: </span><span>{lang.petCard.labels[data.gender]}</span></li>
                        </ul>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions style={{ paddingTop: 5  }} disableSpacing>
                {
                    modeAction ? 
                    (
                        <>
                            <IconButton aria-label="add to favorites" onClick={handleFavorites}>
                                <FavoriteIcon {...petsData?.some(pet => pet.id === data.id) ? {color:"primary"} : {color:"inherit"}} />
                            </IconButton>

                      </>

                    )
                    : 
                    (
                        <IconButton aria-label="remove to favorites" onClick={handleDeleteFavorite} >
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                
            </CardActions>
            <CardActions>
            <FacebookShareButton url={"/pet_info/" + data.id} quote={'adopta esta hermosa mascota'} hashtag={'#huellitasDeAmor'}>
                    <FacebookIcon size={30} round/>
                </FacebookShareButton>
                <WhatsappShareButton url={"/pet_info/" + data.id}  title={'adopta esta hermosa mascota'} separator={'  '}>
                    <WhatsappIcon size={30} round/>
                </WhatsappShareButton>
                <LinkedinShareButton url={"/pet_info/" + data.id}  
                   title={'adopta esta hermosa mascota'} 
                   summary={'Esta aplicación web tiene como objetivo conectar personas con posibles mascotas en adopción'} 
                   source={'huellitasDeAmor'}>
                <LinkedinIcon size={30} round/>
                </LinkedinShareButton>
                <TelegramShareButton url={"/pet_info/" + data.id}  title={'adopta esta hermosa mascota'}>
                    <TelegramIcon size={30} round/>
                </TelegramShareButton>
                <TwitterShareButton url={"/pet_info/" + data.id}  title={'adopta esta hermosa mascota'} hashtag={['#huellitasDeAmor']} related={[]}>
                    <TwitterIcon size={30} round/>
                </TwitterShareButton>
                <EmailShareButton url={"/pet_info/" + data.id}  subject={'Adopcion de Mascota'} body={'Adopta a esta hermosa mascota'} separator={' '}>
                    <EmailIcon size={30} round/>
                </EmailShareButton>
            </CardActions>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    ¡Se ha agregado a Favoritos!
                </Alert>
            </Snackbar>
            <Snackbar open={openRemove} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    ¡Ha sido removido de Favoritos!
                </Alert>
            </Snackbar>

        </Card>
    )
}

export default PetCard;