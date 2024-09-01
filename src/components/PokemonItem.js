import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoDialog from './InfoDialog';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

const PokemonItem = ({pokemon}) => {

    const [open, setOpen] = useState(false);
    const [itemData, setItemData] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const addToFavorites = () => {
        // add pokemon name to local storage
        let dataFromLocalStorage = JSON.parse(localStorage.getItem("favorites"));
        if(!pokemon.isFavorite){
            let newFavorites = [...dataFromLocalStorage , pokemon.name]
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }else{
            // remove pokemon name from local storage
            if(dataFromLocalStorage.length > 0){
                let indexToRemove = dataFromLocalStorage.findIndex((name) => name === pokemon.name);
                dataFromLocalStorage.splice(indexToRemove,1)
                localStorage.setItem("favorites", JSON.stringify(dataFromLocalStorage));
            }
        }
        
        pokemon.isFavorite = !pokemon.isFavorite
        setItemData({...pokemon})
      }

      useEffect(()=> {
        
      },[pokemon])

  return (
    <Grid size={{ xs: 2, sm: 4, md: 3}}>
        <Item>
            <div>{pokemon.name}</div>
            <InfoIcon color="primary" onClick={handleClickOpen}/>
            <InfoDialog info={pokemon} handleClose={handleClose} open={open}/>
            <img src={pokemon.sprites.front_default} alt=''/> 
            <FavoriteBorderIcon style={{ color: pokemon.isFavorite ? "#ff0000" : "#b4b4b4" }} onClick={addToFavorites}/>
        </Item>
    </Grid>
  )
}

export default PokemonItem