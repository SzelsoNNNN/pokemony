import { useContext, useEffect, useState } from "react"
import React from 'react'
import { Stack, TextField, Button } from '@mui/material'
import SinglePokemon from './SinglePokemon'
import Filter from './../Filter.js'
import axios from 'axios'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

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
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [filter, setFilter] = useContext(Filter)
    const [pokemons, setPokemons] = useState([])

    const [currentPokemon, setCurrentPokemon] = useState([])

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=30').then(res => {
            setPokemons(res.data['results'])
        })
    }, [])

    const showFullCard = async key => {
        //console.log(key)
        handleClickOpen()

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`).then(res => {
            console.log(res.data)
            setCurrentPokemon({
                name: res.data.name,
                baseExp: res.data.base_experience,
                photo: res.data.sprites.front_shiny
            })
        })
    }

    return (
        <Stack sx={{ width: '100vw' }} justifyContent="center" alignItems="center">
            <Stack sx={{ width: '100vw', maxWidth: '1000px', marginTop: '20px', padding: '20px' }} wrap={true} >
                {
                    pokemons.map((pokemon, key) => {
                        return (
                            <>
                                <Button m={2} onClick={() => showFullCard(key + 1)} variant="contained">
                                    {pokemon.name}
                                </Button>
                            </>
                        )
                    })
                }
            </Stack>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {currentPokemon.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Podstawowe doświadczenie {currentPokemon.baseExp} <br />
                        <img src={currentPokemon.photo} alt={currentPokemon.name} />
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