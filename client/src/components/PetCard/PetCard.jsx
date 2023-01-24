import { Avatar, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import style from "./PetCard.module.css";
import { Link } from "react-router-dom";

const PetCard = (props) => {

    const { data } = props;
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
                            <li><span style={{ fontWeight: "bold" }}>age: </span><span>{data.age} {data.ageTime}</span></li>
                            <li><span style={{ fontWeight: "bold" }}>genre: </span><span>{data.genre}</span></li>
                        </ul>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions style={{ paddingTop: 5 }} disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default PetCard;