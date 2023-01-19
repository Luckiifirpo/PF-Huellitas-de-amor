import { Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import style from "./TeamMemberCard.module.css";

const TeamMemberCard = (props) => {

    const { data } = props;

    return (
        <Card className={style.card} sx={{ maxWidth: props.maxWidth ? props.maxWidth : 345 }}>
            <CardActionArea>
                <Link to={"/team_member_info/" + data.id}>
                    <CardMedia component="img"
                        sx={{ height: 194 }}
                        image={data ? data.img : ""}
                        alt={(data ? data.name : "") + " image"}>
                    </CardMedia>
                    <CardContent style={{paddingBottom: 5}}>
                        <Typography color="secondary" gutterBottom variant="h5" component="div">
                            {
                                data ? data.name : null
                            }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {
                                data ? data.description : null
                            }
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions style={{paddingTop: 5}} disableSpacing>
                <IconButton aria-label="github">
                    <GitHubIcon color='secondary'/>
                </IconButton>
                <IconButton aria-label="linkedin">
                    <LinkedInIcon color='secondary' />
                </IconButton>
            </CardActions>
        </Card>
    )
};

export default TeamMemberCard;