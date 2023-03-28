import React, { Component } from "react";
import { movies } from "./getMovieData";
class Movie extends Component {
  constructor() {
    super();
    this.state = { hover: "" };
  }
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {data.map((movieObj) => (
            <div
              className="card movie-card"
              key={movieObj.id}
              style={{ width: "18rem", margin: "1rem" }}
              onMouseEnter={()=>this.setState({ hover: movieObj.id })}
              onMouseLeave={()=>this.setState({ hover: "" })}
            >
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                alt={movieObj.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movieObj.title}</h5>
                <p className="card-text ">{movieObj.overview}</p>
              </div>
              <div className="button-flex">
                {this.state.hover === movieObj.id ? (
                  <button className="btn btn-primary movie-button">
                    Add to favourite
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Movie;
