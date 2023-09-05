// We import the necessary React library to create a component
import React from "react";

// Define a functional component called Pokedex
function Pokedex({ pokemonList, onPokemonClick }) {
  return (
    <div>
      {/* We create an unordered list to display the list of Pokemon */}
      <ul className="PokedexList">
        {/* We use the 'map' function to go through the 'pokemonList' array and generate list items for each Pokemon */}
        {pokemonList.map((pokemon, index) => (
          <li key={index} className="PokemonItem">
            <div>
              {/* We display the Pokemon's number, starting from 1 */}
              <span>#{index + 1}</span>

              {/* We display an image of the Pokemon with a click event */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={pokemon.name}
                // When this image is clicked, it triggers the 'onPokemonClick' function with the 'pokemon' object
                onClick={() => onPokemonClick(pokemon)}
              />
            </div>

            {/* We display the name of the Pokemon */}
            <span>{pokemon.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// We export the Pokedex component so it can be used in other parts of the application
export default Pokedex;
