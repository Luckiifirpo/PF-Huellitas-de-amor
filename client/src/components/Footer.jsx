import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <Box className="bg-footer">
        <Container>
            <Grid container justifyContent="space-between" className="footer">
                <Grid item md={4}>
                    <Box>
                        <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                    <Box sx={{marginTop:1.5}}>
                        <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Box>
                        <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                    <Box sx={{marginTop:1.5}}>
                        <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item md={4}>
                <Box>
                    <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                    <Box sx={{marginTop:1.5}}>
                        <Typography component={Link}>
                            Inicio
                        </Typography>
                        <Typography component="span">
                            Lorem ipsum dolor sit.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

export default Footer