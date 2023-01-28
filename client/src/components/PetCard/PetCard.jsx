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
const PetCard = (props) => {

    const { data, modeAction} = props;
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const petsData = useSelector( state => state.adoptions.favoritesPets);
    const lang = useSelector((state) => state.lang.currentLangData);
    const handleFavorites = () => {
        setToggle( state => !state)
        if (!toggle) {
            dispatch(setFavorites(data))
            return
        }
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

    return (
        <Card className={style.card} sx={{ maxWidth: props.maxWidth ? props.maxWidth : 345, height: "100%" }}>
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
                    <CardContent style={{ paddingBottom: 5 }}>
                        <Typography variant="body2" color="text.secondary">
                            {
                                data ? data.description : null
                            }
                        </Typography>
                        <ul className={style.additional_info}>
                            <li><span style={{ fontWeight: "bold" }}>{lang.petCard.labels.edad}: </span><span>{data.age} {lang.petCard.labels[data.ageTime]}</span></li>
                            <li><span style={{ fontWeight: "bold" }}>{lang.petCard.labels.genero}: </span><span>{lang.petCard.labels[data.genre]}</span></li>
                        </ul>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions style={{ paddingTop: 5 }} disableSpacing>
                {
                    modeAction ? 
                    (
                        <IconButton aria-label="add to favorites" onClick={handleFavorites}>
                            <FavoriteIcon {...petsData.some(pet => pet.id === data.id) ? {color:"primary"} : {color:"inherit"}} />
                        </IconButton>

                    )
                    : 
                    (
                        <IconButton aria-label="remove to favorites" onClick={handleDeleteFavorite} >
                            <DeleteIcon />
                        </IconButton>
                    )
                }
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default PetCard;