import React, {useEffect} from 'react'
import { Grid, Typography } from '@mui/material'
import PetCard from '../../components/PetCard/PetCard'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../../redux/slices/adoptionSlice'
import style from "./Adoptions.module.css"

const Favorites = () => {
    const dispatch = useDispatch()
    const petsData = useSelector( state => state.adoptions.favoritesPets)
    useEffect(()=>{
        dispatch(getFavorites())
    },[])
    console.log(petsData)
    return (
        <>
            <Grid container spacing={2} alignItems="flex-start" style={{ minHeight: "500px" }}>
              {
                petsData && petsData.length ? petsData.map((petData, key) => {
                  return <Grid key={key} item lg={4} md={6} xs={12} alignSelf="stretch">
                    <PetCard data={petData} />
                  </Grid>
                }) : <div className={style.empty_data_container}>
                  <Typography color="secondary" component="h1" variant="h4" style={{ marginTop: 30 }} sx={{ color: '#FF3041', fontWeight: 'Bold' }}>
                    Ninguna entrada coincide con los filtros seleccionados
                  </Typography>
                </div>
              }
            </Grid>
        </>
      )
    }
    
export default Favorites