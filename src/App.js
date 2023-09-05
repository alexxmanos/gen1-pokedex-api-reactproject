// We import the necessary React library and styles from a CSS file
import React, { useState, useEffect } from "react";
import "./styles.css"; // Importing CSS styles
import Pokedex from "./components/Pokedex"; // Importing the Pokedex component
import PokemonDetails from "./components/PokemonDetails"; // Importing the PokemonDetails component

// Define the main App component
function App() {
  // We use state variables to manage data within the component
  const [pokemonList, setPokemonList] = useState([]); // Stores a list of Pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Stores the selected Pokemon

  // This effect runs when the component mounts
  useEffect(() => {
    // We create an async function to fetch a list of Generation 1 Pokemon
    async function fetchPokemonList() {
      try {
        // We send a request to the PokeAPI to get a list of Pokemon (limit: 151 for Gen 1)
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        // We convert the response data to JSON format
        const data = await response.json();

        // We update the 'pokemonList' state with the list of Pokemon
        setPokemonList(data.results);
      } catch (error) {
        // If there's an error during the fetch, we log it
        console.error("Error fetching Pokemon data:", error);
      }
    }

    // We call the fetchPokemonList function when the component mounts (empty dependency array)
    fetchPokemonList();
  }, []); // Empty dependency array means it runs once when the component mounts

  // This function handles clicks on Pokemon in the Pokedex
  const handlePokemonClick = (pokemon) => {
    // We update the 'selectedPokemon' state with the clicked Pokemon
    setSelectedPokemon(pokemon);
  };

  // This is the component's rendered output
  return (
    <div className="App">
      {/* Header */}
      <h1>Generation 1 Pokemon</h1>

      {/* App Container */}
      <div className="AppContainer">
        {/* Content Container */}
        <div className="ContentContainer">
          {/* Pokedex Container */}
          <div className="PokedexContainer">
            {/* We render the Pokedex component, passing the 'pokemonList' and 'handlePokemonClick' function as props */}
            <Pokedex
              pokemonList={pokemonList}
              onPokemonClick={handlePokemonClick}
            />

            {/* We render the PokemonDetails component only if 'selectedPokemon' is not null */}
            {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// We export the App component so it can be used in other parts of the application
export default App;
