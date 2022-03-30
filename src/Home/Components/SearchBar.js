import { useContext } from "react"
import React from 'react'
import {Stack, TextField} from '@mui/material'
import Filter from './../Filter.js'

const SearchBar = () => {
    const [filter, setFilter] = useContext(Filter)
    
    const setName = content => {
        setFilter({
            name: content
        })
    }

    return(
        <>
            <Stack sx={{width: '100vw', marginTop: '20px'}} justifyContent="center" alignItems="center">
                <TextField sx={{width: '90%', maxWidth: '1000px'}} color="error" label="Nazwa pokemona" size="small" variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                />
            </Stack>
        </>
    )
}

export default SearchBar