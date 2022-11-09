import React from "react";
import { Link, Outlet } from "react-router-dom";
function Account() {
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur");
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="level-2">
      <div className="side-bar">
        <div className="padding-2rem">
          <Link to="account-details">
            <strong>Account Details</strong>
          </Link>
        </div>
        <div>
          <Link to="view-balance">
            <strong>View Balance</strong>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
    // <div>
    //   {error ? (
    //     <>Oh no, there was an error</>
    //   ) : isLoading ? (
    //     <>Loading...</>
    //   ) : data ? (
    //     <>
    //       <h3>{data.species.name}</h3>
    //       <img src={data.sprites.front_shiny} alt={data.species.name} />
    //     </>
    //   ) : null}

    //   {error2 ? (
    //     <>Oh no, there was an error2</>
    //   ) : isLoading2 ? (
    //     <>getting data from accounts microservice ...</>
    //   ) : user ? (
    //     <>{/* <h3>{user}</h3> */}</>
    //   ) : null}
    // </div>
  );
}
export default Account;
