import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useState } from "react";
import PetCard from "../PetCard/PetCard";
import TeamMemberCard from "../TeamMemberCard/TeamMemberCard";
import style from "./CardViewer.module.css";
import CardViewer_Pagination_Behavior from "./CardViewer.Pagination";

const CardViewer = (props) => {
    const { cardsDataList, currentPage, onChangePage, cardType, emptyListLabel, modeAction, card_lg, card_md, card_xs } = props;
    const [page_chunks, set_page_chunks] = useState([]);

    const ChangePage = (event, value) => {
        if (onChangePage) {
            onChangePage(value);
        }
    }

    const create_pagination = () => {
        const pets_page_chunks = CardViewer_Pagination_Behavior.Apply(cardsDataList, 6);
        set_page_chunks(pets_page_chunks);

        if (pets_page_chunks.length && currentPage >= pets_page_chunks.length && onChangePage) {
            onChangePage(pets_page_chunks.length);
        }
    }

    const render_card = (card_data) => {
        switch (cardType) {
            case "pet_card":
                return <PetCard modeAction={modeAction} data={card_data} />
            case "team_member_card":
                return <TeamMemberCard data={card_data} />
            default:
                return null;
        }
    }
    useEffect(() => {
        create_pagination();
    }, [cardsDataList]);

    return <Grid container>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
            {
                cardsDataList && cardsDataList.length ? <Pagination count={page_chunks.length} page={currentPage} onChange={ChangePage} /> : null
            }
        </Grid>
        <Grid item xs={12}>
            <Box>
                <Grid container spacing={2} alignItems="flex-start" style={{ minHeight: "500px" }}>
                    {

                        page_chunks && page_chunks.length ? page_chunks[(currentPage - 1)].map((card_data, key) => {
                            return <Grid key={key} item lg={4} md={6} xs={12} alignSelf="stretch">
                                {
                                    render_card(card_data)
                                }
                            </Grid>
                        }) : <div className={style.empty_data_container}>
                            <Typography color="secondary" component="h1" variant="h4" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                                {emptyListLabel}
                            </Typography>
                        </div>
                    }
                </Grid>
            </Box>
        </Grid>
    </Grid>
}

export default CardViewer;

/*
<Grid container alignItems="center" justifyContent="center">
              {
                globalState.petsData && globalState.petsData.length ? <Pagination count={globalState.pageChunks.length} page={globalState.currentPage} onChange={ChangePage} /> : null
              }
            </Grid>
*/