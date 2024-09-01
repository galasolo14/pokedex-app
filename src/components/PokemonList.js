import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PokemonItem from './PokemonItem';
import { useFilteredPokemonsStore } from './../services/store';

const PokemonList = () => {
  const filteredPokemons = useFilteredPokemonsStore((state) => state.filteredPokemons);

  return (
    <Box sx={{ flexGrow: 1 }} marginTop={2}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
        {filteredPokemons.map((p) => {
            return (
                <PokemonItem key={p.name} pokemon={p}/>
            )
        }
        )}
      </Grid>
    </Box>

  )
}

export default PokemonList