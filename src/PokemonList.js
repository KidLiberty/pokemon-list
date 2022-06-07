import React, { useState, useEffect } from 'react'

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=500`)
      .then(res => res.json())
      .then(allPokemon =>
        allPokemon.results.forEach(pokemon => {
          fetch(pokemon.url)
            .then(res => res.json())
            .then(data => setPokemonList(current => [...current, data]))
            .catch(err => `Error: ${err}`)
        })
      )
      .catch(err => `Error: ${err}`)
  }, [])

  const SearchBar = () => (
    <div className='searchbar-div'>
      <input
        className='searchbar'
        placeholder='Search Pokemon...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )

  const PokemonCardList = () => (
    <div className='pokemonlist-container'>
      {search !== ''
        ? filteredPokemon
            .map(pokemon => <PokemonCard key={pokemon.id} {...pokemon} />)
            .sort((a, b) => {
              return a - b
            })
        : pokemonList
            .map(pokemon => <PokemonCard key={pokemon.id} {...pokemon} />)
            .sort((a, b) => {
              return a - b
            })}
    </div>
  )

  const PokemonCard = props => (
    <div className='pokemonlist-div'>
      <h3>{`#${props.id} ${
        props.name[0].toUpperCase() + props.name.slice(1)
      }`}</h3>
      <img
        className='sprite-image'
        src={props.sprites.front_default}
        alt={'Pokemon Sprite'}
      />
      <p>
        {`Abilities: ${
          props.abilities[0].ability.name[0].toUpperCase() +
          props.abilities[0].ability.name.slice(1)
        }`}
      </p>
    </div>
  )

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='container'>
      <div className='searchbar-div'>
        <input
          className='searchbar'
          placeholder='Search Pokemon...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <PokemonCardList />
    </div>
  )
}
