import React, { useEffect } from 'react'
import { Grid, Typography, Container } from '@mui/material'
import PetCard from '../../components/PetCard/PetCard'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../../redux/slices/adoptionSlice'
import style from "./Favorites.module.css"
import CardViewer from '../../components/CardViewer/CardViewer'
import LeftSideUserCard from '../../components/LeftSideUserCard/LeftSideUserCard'

const Favorites = () => {
    const dispatch = useDispatch()
    const petsData = useSelector(state => state.adoptions.favoritesPets)
    useEffect(() => {
        dispatch(getFavorites())
    }, [])

    return (
        <>
            <Container >
                <Typography component="h1" variant="h3" style={{ marginTop: '150px', marginBottom: '10px', color: '#FF3041' }}>
                    Tus Mascotas Favoritas
                </Typography>
                <Grid container style={{ minHeight: "500px", marginTop:'30px',marginBottom:'100px', padding:'50px', }}>
                    <Grid item md={4}>
                        <LeftSideUserCard />
                    </Grid>
                    <Grid item md={8}>
                        <CardViewer modeAction={false} cardType="pet_card" cardsDataList={petsData} currentPage={1} emptyListLabel={"No Hay Favoritos"} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Favorites

/*
<Grid container spacing={2} alignItems="flex-start" style={{ minHeight: "500px", marginTop:'30px',marginBottom:'100px', padding:'50px', }}>
                {
                    petsData && petsData.length ? petsData.map((petData, key) => {
                    return <Grid key={key} item lg={3} md={6} xs={12} alignSelf="stretch">
                                <PetCard modeAction={false} data={petData} />
                            </Grid>
                    }) : 
                    <div className={style.empty_data_container}>
                        <Typography color="secondary" component="h1" variant="h4" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                            No Hay Favoritos
                        </Typography>
                    </div>
                }
                </Grid>
*/