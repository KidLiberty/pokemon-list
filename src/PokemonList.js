import React, { useState, useEffect } from 'react'

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState([])
  const [shinyToggle, setShinyToggle] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=750`)
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

  const NavBar = () => (
    <div className='searchbar-div'>
      <input
        className='searchbar'
        placeholder='Search Pokemon...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button
        className={shinyToggle ? 'btn' : 'btn btn-shiny'}
        onClick={() => setShinyToggle(!shinyToggle)}
      >
        Shiny
      </button>
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
    <div className='pokemon-card'>
      <h3 className='pokemon-name'>{`#${props.id} ${
        props.name[0].toUpperCase() + props.name.slice(1)
      }`}</h3>
      <img
        className='sprite-image'
        src={
          shinyToggle ? props.sprites.front_shiny : props.sprites.front_default
        }
        alt={'Pokemon Sprite'}
      />
      <p>
        {`Abilities: ${
          props.abilities[0].ability.name[0].toUpperCase() +
          props.abilities[0].ability.name.slice(1)
        }`}
      </p>
      <PreviousAndNextButton ButtonStyles={ButtonStyles} />
    </div>
  )

  const PreviousAndNextButton = props => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <button className='btn' style={props.ButtonStyles}>
        Previous
      </button>
      <button className='btn' style={props.ButtonStyles}>
        Next
      </button>
    </div>
  )

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  const ButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(140, 115, 179)',
    fontSize: '16px',
    margin: '10px',
    width: '100px'
  }

  return (
    <div className='container'>
      <NavBar />
      <PokemonCardList />
    </div>
  )
}
