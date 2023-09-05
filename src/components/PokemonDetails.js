// We import the necessary React library and hooks
import React, { useState, useEffect } from "react";

// Define a component called PokemonDetails that receives a 'pokemon' prop
function PokemonDetails({ pokemon }) {
  // We use state to manage the Pokemon's details and setDetails to update it
  const [details, setDetails] = useState(null);

  // This effect runs when 'pokemon' prop changes (or when the component mounts)
  useEffect(() => {
    // We create an async function to fetch the Pokemon's details
    async function fetchPokemonDetails() {
      try {
        // We make a network request to the 'pokemon.url' using the Fetch API
        const response = await fetch(pokemon.url);

        // We check if the network response is successful
        if (!response.ok) {
          // If not, we handle the error and log it
          throw new Error("Network response was not ok");
        }

        // We parse the response data as JSON
        const data = await response.json();

        // We update the 'details' state with the fetched data
        setDetails(data);
      } catch (error) {
        // If there's an error during the fetch, we log it
        console.error(`Error fetching details for ${pokemon.name}:`, error);
      }
    }

    // We call the fetchPokemonDetails function when 'pokemon' changes
    fetchPokemonDetails();
  }, [pokemon]); // We specify 'pokemon' as a dependency to watch for changes

  // This part determines what to display based on the availability of 'details'
  return (
    <div className="PokemonDetails">
      {details ? ( // If 'details' is available (not null), we show the Pokemon's details
        <>
          <h2>{pokemon.name}</h2>
          <div className="DetailsInfo">
            <p>Height: {details.height / 10} m</p>
            <p>Weight: {details.weight / 10} kg</p>
            <p>
              Abilities:{" "}
              {details.abilities
                .map((ability) => ability.ability.name)
                .join(", ")}
            </p>
          </div>
          {/* We display the Pokemon's image using a URL */}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
        </>
      ) : (
        // If 'details' is not available (null), we show a loading message
        <p>Loading...</p>
      )}
    </div>
  );
}

// We make this component available for use in other parts of the app
export default PokemonDetails;
