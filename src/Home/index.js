import React, {useState} from 'react'
import SearchBar from './Components/SearchBar'
import Pokedex from './Components/Pokedex'
import Filter from './Filter'

const initialContext = {
    name: ''
}

const Home = () => {
    const [filter, setFilter] = useState(initialContext)
    return(
        <Filter.Provider value={[filter, setFilter]}>
            <SearchBar />
            <Pokedex />
        </Filter.Provider>
    )
}

export default Home