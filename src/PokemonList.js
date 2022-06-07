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

  const Pokemon = props => (
    <div className='pokemon-div'>
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

  const regi = []
  regi.push(pokemonList[375])
  console.log(regi)
  console.log(pokemonList)

  return (
    <div className='pokemon-container'>
      <div>
        <input
          className='searchbar'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {search !== ''
        ? filteredPokemon
            .map(pokemon => <Pokemon key={pokemon.id} {...pokemon} />)
            .sort((a, b) => {
              return a - b
            })
        : pokemonList
            .map(pokemon => <Pokemon key={pokemon.id} {...pokemon} />)
            .sort((a, b) => {
              return a - b
            })}
    </div>
  )
}
