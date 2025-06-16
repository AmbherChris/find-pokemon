"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");
  function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

  async function fetchData() {
    if (!name) return;

    try {
      const response = await fetch(`
        https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokemon not found");

      const data = await response.json();
      setPokemon(data);
      setError("");
    } catch (err) {
      setPokemon(null);
      setError("Pokemon not found");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="container">
        <h1 className="title">
          Search Pokémon
        </h1>

        <div className="searchContainer">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Pokémon name"
            className="input"
          />
          <button
            onClick={fetchData}
            className="btn"
          >
            Find
          </button>
        </div>

        {error && <p className="err">{error}</p>}

        {pokemon && (
          <div
            className="cardContainer"
            style={{ backgroundImage: "url(/bg.jpg)" }}
          >
            <div className="stat">
              <h3>Name: {capitalize(pokemon.name)}</h3>
              <h3>HP: {pokemon.stats[0].base_stat}</h3>
            </div>
            <img
              src={pokemon.sprites.front_default}
              width={512}
              height={512}
              alt={pokemon.name}
              className="pokemonSprite"
            />
            <div className="infoContainer">
              <h4 className="font-bold">Abilities:</h4>
              {pokemon.abilities.map((index, i) => (
                <p className="bg-[white] px-2 shadow-md rounded-sm" key={i}>
                  {capitalize(index.ability.name)}
                </p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
