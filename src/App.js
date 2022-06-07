import React, { useState, useEffect } from 'react'

/* 

1.) Why do you need to use the functin version of useState() ? 

*/

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
      <h3>{`${props.name[0].toUpperCase() + props.name.slice(1)}`}</h3>
      <img src={props.sprites.front_default} alt={'Pokemon Sprite'} />
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
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {pokemonList.map(pokemon => {
        return <Pokemon key={pokemon.id} {...pokemon} />
      })}
      {/* {search !== ''
        ? filteredPokemon.map(pokemon => (
            <div key={pokemon.id} className='pokemon-div'>
              <PokemonCard
                value={`#${pokemon.id} ${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }`}
              />
              <img src={pokemon.sprites.front_default} alt={'Pokemon Sprite'} />
            </div>
          ))
        : pokemonList.map(pokemon => (
            <div key={pokemon.id} className='pokemon-div'>
              <PokemonCard
                value={`#${pokemon.id} ${
                  pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                }`}
              />
              <img src={pokemon.sprites.front_default} alt={'Pokemon Sprite'} />
            </div>
          ))} */}
    </div>
  )
}
