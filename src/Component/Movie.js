import React, { Component } from "react";
import { movies } from "./getMovieData";
class Movie extends Component {
  render() {
    let data = movies["results"];

    return data === "" ? (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </>
    ) : (
      <div>
        <h3 className="text-center">Trending Movies</h3>
        <div style={{display:"flex",flexWrap:'wrap',justifyContent:'space-around'}}>
            {
                data.map((movieObj)=>(
                    <div class="card" style={{width: "18rem",margin:"1rem"}}>
                    <img class="card-img-top" src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`} alt={movieObj.title} />
                    <div class="card-body">
                      <h5 class="card-title">{movieObj.title}</h5>
                      <p class="card-text">{movieObj.overview}</p>
                      {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    </div>
                  </div>
                ))
            }
        </div>
      </div>
    );
  }
}

export default Movie;
