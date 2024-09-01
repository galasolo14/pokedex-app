import { create } from "zustand";
import { API } from './api'

export const usePokemonsStore = create((set) => ({
    pokemons : [],
    setPokemons: (list) => {
        set({pokemons: list})
    }
}))

export const useFilteredPokemonsStore = create((set) => ({
    filteredPokemons : [],
    setfilteredPokemons: (list) => {
        set({filteredPokemons: list})
    }
}))

export const useNextPageStore = create((set) => ({
    nextPage : null,
    setNextPage: (next) => {
        set({nextPage: next})
    }
}))

export const usePreviousPageStore = create((set) => ({
    previousPage : null,
    setPreviousPage: (previous) => {
        set({previousPage: previous})
    }
}))

export const useCurrentUrlStore = create((set) => ({
    currentUrl : API,
    setCurrentUrl: (url) => {
        set({currentUrl: url})
    }
}))

export const useSearchValueStore = create((set) => ({
    searchValue : '',
    setSearchValue: (value) => {
        set({searchValue: value})
    }
}))

export const useAlertStore = create((set) => ({
    alert : false,
    setAlert: (value) => {
        set({alert: value})
    }
}))