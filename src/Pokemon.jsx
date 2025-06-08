
import { useState } from "react";
import "./index.css";
import { Pokemoncards } from "./PokemonCard";
import { useEffect } from "react";









export const Pokemon = () => {
  
    const [Pokemon,setPokemon] = useState([]);
    const [loading,setloading] = useState(true);
    const [error,seterror] = useState(null);
    const [search,setsearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

  
  const fetchPokemon = async () => {
     try {
        const res = await fetch(API);
        const data = await res.json();
        // console.log(data);

        const detailPokemonData = data.results.map( async (curPokemon) => {
            // console.log(curPokemon.url);
            const res = await fetch(curPokemon.url);
            const data = await res.json();
            console.log(data);
            return data;
            
            
        });
        // console.log(detailPokemonData);

        const detailedResponeses =  await Promise.all(detailPokemonData);
        console.log(detailedResponeses);
        setPokemon(detailedResponeses);
        setloading(false);

      } catch (error) {
        console.log(error);
        setloading(false);
        seterror(error);
     }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // search 

  const searchcontent = Pokemon.filter((curPokemon) => 
    curPokemon.name.toLowerCase().includes(search.toLocaleLowerCase())
    );

  if (loading){
    return(
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  if(error) {
    return(
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <>
     <section className="container">
        <header>
            <h1>Lets Catch Pokemon</h1>
        </header>
        <div className="pokemon-search">
          <input 
             type="text"
             placeholder="search Pokemon"
             value={search}
             onChange={(e)=> setsearch(e.target.value)}
          />
        </div>
        <div>
            <ul className="cards">
                {

                    searchcontent.map((curPokemon) => {
                        return (
                        <Pokemoncards key={curPokemon.id} pokemonData = {curPokemon}/>
                        );
                    })
                }
            </ul>
        </div>
     </section>
    </>
  );
};
