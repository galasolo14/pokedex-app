import React, { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { API } from './../services/api';
import { 
  useSearchValueStore,
  usePokemonsStore,
  useFilteredPokemonsStore,
  useAlertStore
 } from '../services/store';
import { useDebounce } from '../services/hooks';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const SearchName = () => {
  // Zustand - Before Zustand "searchValue" was passed via props
  const searchValue = useSearchValueStore((state) => state.searchValue);
  const setSearchValue = useSearchValueStore((state) => state.setSearchValue);
  const pokemons = usePokemonsStore((state) => state.pokemons);
  const filteredPokemons = useFilteredPokemonsStore((state) => state.filteredPokemons);
  const setfilteredPokemons = useFilteredPokemonsStore((state) => state.setfilteredPokemons);
  const setAlert = useAlertStore((state) => state.setAlert);

  const debouncedSearch = useDebounce(searchValue);

  const noResult = () => {
    // Before Zustand 'noResult' was stored in app.js
    setfilteredPokemons(pokemons)
    setAlert(true)
    const timeout = setTimeout(()=> {
      setAlert(false)
    },2000)

    return () => clearTimeout(timeout)
  }

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value) 
  }

  const filterList = async() => {
    // Before Zustand 'filterList' was stored in app.js and passed via props
    if(searchValue.length > 0) {
      // Filter pokemon list
      let filtered = pokemons.filter(({name})=> {
        return name.startsWith(searchValue)})
      if(filtered.length){
        //If results in filter show match pokemons
        setfilteredPokemons(filtered)
      }else if (isNaN(searchValue)) {
        //If search is no a number try to get pokemone name from API
        try{
          await axios.get(`${API}/${searchValue}`).then(res =>{
            // check if pokemon is favorite
            let dataFromLocalStorage = localStorage.getItem("favorites")
            let checkFavorites = dataFromLocalStorage.includes(res.data.name)
            res.data.isFavorite = checkFavorites
            setfilteredPokemons([res.data, ...filteredPokemons])
          })
        }catch(err){
          //No pokemon with this name in API
          noResult();
        }
      }else{
        //when try to search for number retun "no results" to not alow duplicataed pokemon
        noResult();
      }
    }else{
      //set pokemon list back to original 20 if search lenght is 0
      setfilteredPokemons(pokemons)
    }
    
  }

  useEffect(() => {
    filterList();
  }, [debouncedSearch])

  return (
    <Search>
        <SearchIconWrapper>
        <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e)=> onChangeSearchValue(e)}
        value={searchValue}
        />
    </Search>
  )
}

export default SearchName