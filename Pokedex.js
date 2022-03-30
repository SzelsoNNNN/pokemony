import { useContext, useEffect, useState } from "react"
import React from 'react'
import Filter from './../Filter.js'
import axios from 'axios'

///////////////////////////////////////
//
//  Załadowanie bibliotek od MaterialUI
//
///////////////////////////////////////

import { Stack, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';



///////////////////////////////////////
//
//  Utworzenie "planszy" dla okna dialogowego, przyciemnienie tła i wyświetlenie na nim okna dialogowego
//
///////////////////////////////////////

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}


const Pokedex = () => {
    // Stan od otwarcia/zamknięcia okna dialogowego
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Pobranie filtrów z kontekstu
    const [filter, setFilter] = useContext(Filter)

    // Inicjacja stanu, który służy za miejsce docelowe pobranych danych
    const [pokemons, setPokemons] = useState([])

    // Inicjacja stanu pomocnicznego, który aktywuje się po kliknięciu na pokemona przesyłając do niego dane o wyborze
    const [currentPokemon, setCurrentPokemon] = useState([])


    // Pobranie danych przy wczytaniu strony z pomocą useEffect() i axiosa - biblioteki do obsługi requestów API
    useEffect(() => {
        //axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000').then(res => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=200').then(res => {
            setPokemons(res.data['results'])
        })
    }, [])


    // Funkcja pobierająca ID danego pokemona i wysyłająca kolejne zapytanie do API tym razem o jednego konretnego pokemona
    const showFullCard = async key => {
        //console.log(key)
        handleClickOpen()

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`).then(res => {
            console.log(res.data)
            // Ustawienie stanu na obecnego pokemona
            setCurrentPokemon({
                id: key,
                name: res.data.name,
                baseExp: res.data.base_experience,
                photo: res.data.sprites.front_shiny
            })
        })
    }

    return (
        <Stack sx={{ width: '100vw' }} justifyContent="center" alignItems="center">
            <Stack sx={{ width: '100%', maxWidth: '1000px', marginTop: '10px' }} direction="row" flexWrap="wrap" justifyContent="space-around" alignItems="center" >
                {
                    // Użycie funkcji JavaScript map, który przechodzi w pętli przez całą tablice stanu pokemons
                    pokemons.map((pokemon, key) => {
                        if(pokemon.name.includes(filter.name))
                        
                        return (
                            <>
                                <Button sx={{ width: '90%', maxWidth: '260px', margin: '20px 0px 20px 0px' }} m={2} onClick={() => showFullCard(key + 1)} variant="contained">
                                    {pokemon.name}
                                </Button>
                            </>
                        )
                    })
                }
            </Stack>
            
            {/* Ustawienie danych do okna dialogowego */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move', }} id="draggable-dialog-title">
                    {currentPokemon.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Podstawowe doświadczenie {currentPokemon.baseExp} <br />
                        <img width={'100%'} src={currentPokemon.photo} alt={currentPokemon.name} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" autoFocus onClick={handleClose}>
                        Zamknij
                    </Button>
                </DialogActions>
            </Dialog>


        </Stack>
    )
}

export default Pokedex