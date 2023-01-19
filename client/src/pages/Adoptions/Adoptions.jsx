import { Button, Card, CardContent, Divider, Grid, List, ListItemButton, ListItemText, Pagination } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import PetCard from '../../components/PetCard/PetCard'
import style from "./Adoptions.module.css"

const testingPetList = [
  {
    "id": "1",
    "date": "1-Jan-2023",
    "species": "Dog",
    "name": "Rex",
    "age": "2yrs",
    "weight": "25kg",
    "size": "Big",
    "genre": "Male",
    "breed": "Cacri",
    "description": "Its a black lovely dog, who likes to play with kids",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZJlbDtw4byJKcug1ME7qlpG1jet3tHg1zA&usqp=CAU"
  }, {
    "id": "2",
    "date": "6-Jan-2023",
    "species": "Dog",
    "name": "princess",
    "age": "8yrs",
    "weight": "10kg",
    "size": "medium",
    "genre": "female",
    "breed": "Spaniel",
    "description": "Beautiful grandma dog XD, its a great company for people and loves to be pet",
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiEwsd1j4JLO9RoDf1e5DJOyRzJ6MHHC-sHpoD-i0DFjiQER8KvxTD7ZAbAQiKnOEpB4c&usqp=CAU"
  }, {
    "id": "3",
    "date": "6-dec-2022",
    "species": "Cat",
    "name": "gato",
    "age": "1 yr",
    "weight": "10kg",
    "size": "medium",
    "genre": "male",
    "breed": "orange",
    "description": "lovely cat, likes to spend his time on you, you cant until his willing",
    "img": "https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/63468940d3974.jpeg"
  }, {
    "id": "4",
    "date": "22-oct-2022",
    "species": "Dog",
    "name": "Good boy",
    "age": "3 yr",
    "weight": "8kg",
    "size": "small",
    "genre": "male",
    "breed": "White",
    "description": "lovely dog, obeys every order you give to him",
    "img": "https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/63468940d3974.jpeg"
  }, {
    "id": "5",
    "date": "15-jan-2023",
    "species": "Cat",
    "name": "mickey",
    "age": "3 months",
    "weight": "1kg",
    "size": "small",
    "genre": "male",
    "breed": "black",
    "description": "he is like a ninja cat, in the night you only see his big yellow eyes",
    "img": "https://img.freepik.com/fotos-premium/pequeno-gatito-negro-que-sienta-cerca-pared-casa_199743-10497.jpg?w=360"
  }, {
    "id": "6",
    "date": "7-nov-2022",
    "species": "Cat",
    "name": "gato",
    "age": "1 yr",
    "weight": "10kg",
    "size": "medium",
    "genre": "male",
    "breed": "orange",
    "description": "lovely cat, likes to spend his time on you, you cant until his willing",
    "img": "https://imagenes.muyinteresante.es/files/vertical_composte_image/uploads/2022/10/12/63468940d3974.jpeg"
  }

]

const Adoptions = () => {

  const [selectedAdoptionFilterIndex, setSelectedAdoptionFilterIndex] = React.useState(-1);

  const adoptionListItemClick = (event, index) => {
    setSelectedAdoptionFilterIndex(index);
  };

  const resetAdoptionFilterIndex = (event) => {
    setSelectedAdoptionFilterIndex(-1);
  }

  return (
    <div>
      <Container style={{ marginBottom: 30 }} >
        <Grid container spacing={5} alignItems="flex-start">
          <Grid item lg={10}>
            <Grid container alignItems="center" justifyContent="center">
              <Pagination style={{marginLeft: 300}} count={10} />
            </Grid>
          </Grid>
          <Grid item lg={2}>
            <Button className={style.custom_buttom} variant="outlined" size="medium" disableRipple>
              <span>Publicar</span>
            </Button>
          </Grid>
          <Grid item lg={3}>
            <Card>
              <CardContent>
                <List>
                  <ListItemButton selected={selectedAdoptionFilterIndex === 0}
                    onClick={(event) => adoptionListItemClick(event, 0)}>
                    <ListItemText primary="POR TAMAÑO" />
                  </ListItemButton>
                  <ListItemButton selected={selectedAdoptionFilterIndex === 1}
                    onClick={(event) => adoptionListItemClick(event, 1)}>
                    <ListItemText primary="POR EDAD" />
                  </ListItemButton>
                  <ListItemButton selected={selectedAdoptionFilterIndex === 2}
                    onClick={(event) => adoptionListItemClick(event, 2)}>
                    <ListItemText primary="POR PESO" />
                  </ListItemButton>
                  <Divider />
                  <ListItemButton onClick={resetAdoptionFilterIndex}>
                    <ListItemText primary="Reiniciar" />
                  </ListItemButton>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={9}>
            <Grid container spacing={2} alignItems="flex-start">
              {
                testingPetList.map((petData, key) => {
                  return <Grid key={key} item md={4}>
                    <PetCard data={petData} />
                  </Grid>
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

export default Adoptions