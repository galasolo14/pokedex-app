import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import {
   useNextPageStore,
  usePreviousPageStore,
  useCurrentUrlStore,
  usePokemonsStore,
  useFilteredPokemonsStore,
  useAlertStore,
  } from './services/store';

function App() {
  
  // Zustand
  const setPokemons = usePokemonsStore((state) => state.setPokemons);
  const setfilteredPokemons = useFilteredPokemonsStore((state) => state.setfilteredPokemons);
  const setNextPage = useNextPageStore((state) => state.setNextPage);
  const setPreviousPage = usePreviousPageStore((state) => state.setPreviousPage);
  const currentUrl = useCurrentUrlStore((state) => state.currentUrl);
  const alert = useAlertStore((state) => state.alert);
  
  // before Zustand
  // const [currentUrl, setCurrentUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  // const [nextPage, setNextPage] = useState();
  // const [previousPage, setPreviousPage] = useState();
  // const [searchValue, setSearchValue] = useState('');
  // const [pokemons, setPokemons] = useState([]);
  // const [filteredPokemons, setfilteredPokemons] = useState([]);
  // const [alert, setAlert] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [favoritesPokemons, setFavoritesPokemons] = useState([]);

  // before Zustand - now it in 'SearchName component
  // const noResult = () => {
  //   setfilteredPokemons(pokemons)
  //   setAlert(true)
  //   const timeout = setTimeout(()=> {
  //     setAlert(false)
  //     console.log('test')
  //   },2000)

  //   return () => clearTimeout(timeout)
  // }

  // before Zustand - now it in 'SearchName component
  // const filterList = async(e) => {
  //   // Zustand
  //   setSearchValue(e.target.value)
  //   let filtered = pokemons.filter(({name})=> {
  //     return name.startsWith(e.target.value)})
  //   if(filtered.length){
  //     setfilteredPokemons(filtered)
  //   }else if (isNaN(e.target.value)) {
  //     try{
  //       await axios.get(`${API}/${e.target.value}`).then(res =>{
  //         setfilteredPokemons([res.data, ...filteredPokemons])
  //       })
  //     }catch(err){
  //       noResult();
  //     }
  //   }else{
  //     noResult();
  //   }
  // }

  const getPokemonList= async() => {
    setLoading(true)

    //Get fevorite pokemon list from local storage
    let dataFromLocalStorage = localStorage.getItem("favorites")
    if(dataFromLocalStorage){
      setFavoritesPokemons(JSON.parse(dataFromLocalStorage))
    }else{
      localStorage.setItem("favorites", JSON.stringify(favoritesPokemons));
    }

    let cencel
    try{
      await axios.get(currentUrl, {
        cancelToken: new axios.CancelToken(c => cencel =c)
      }).then(res => {
        // zustand
        setNextPage(res.data.next)
        setPreviousPage(res.data.previous)

        let listToSet = []

        //Get all 20 pokemons more info with image
        const getMoreInfo= async (list) => {
          const promises = list.map( element => {
              return axios.get(element.url).then(res =>{
              let checkFavorites
              if(dataFromLocalStorage){
                checkFavorites = dataFromLocalStorage.includes(element.name)
              }
              res.data.isFavorite = checkFavorites
              listToSet = [...listToSet, res.data]
            })
          });
          await Promise.all(promises)
          // zustand
          setPokemons(listToSet)
          setfilteredPokemons(listToSet)
          setLoading(false)
        }

        getMoreInfo(res.data.results)  
        
      })
      return () => cencel()
    }catch(err){
      throw(err)
    }
  }

  useEffect(() => {
    getPokemonList();
  }, [currentUrl])

  // before Zustand
  // const getNextpage = () => {
  //   setCurrentUrl(nextPage)
  // }

  // const getPreviouspage = () => {
  //   setCurrentUrl(previousPage)
  // }

  if (loading) return "Loading..."

  return (
    <div className="App">
      {alert && <Alert severity="error" className='alertMsg'>No results found</Alert>}
      <Header
        // before Zustand
        // filterList={filterList}
        // getPreviouspage={previousPage ? getPreviouspage : null}
        // getNextpage={nextPage ? getNextpage : null}
        // searchValue={searchValue}
      />
      <PokemonList />
      {/* // before Zustand 
      <PokemonList pokemons={filteredPokemons}/> */}
    </div>
  );
}

export default App;
