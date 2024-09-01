import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchName from './SearchName';
import { useNextPageStore, usePreviousPageStore, useCurrentUrlStore, useSearchValueStore } from '../services/store';

const Header = () => {
    /// Zustand - Before Zustand "getnextPage" & "getpreviousPage" was passed via props for the "setCurrentUrl"
    const nextPage = useNextPageStore((state) => state.nextPage);
    const previousPage = usePreviousPageStore((state) => state.previousPage);
    const setCurrentUrl = useCurrentUrlStore((state) => state.setCurrentUrl);
    const setSearchValue = useSearchValueStore((state) => state.setSearchValue);

    const getNextUrl = () => {
        setSearchValue('')
        setCurrentUrl(nextPage)
    }

    const getPreviosUrl = () => {
        setSearchValue('')
        setCurrentUrl(previousPage)
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{display: { xs: 'none', sm: 'block' } }}
                >
                Pokedex
                </Typography>
                <SearchName/>
                {/* Before Zustand 
                <SearchName searchValue={searchValue} filterList={filterList}/> */}
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
                {previousPage && <Button onClick={getPreviosUrl} color="inherit">Previous</Button>}
                {nextPage && <Button onClick={getNextUrl} color="inherit">Next</Button>}
            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default Header
