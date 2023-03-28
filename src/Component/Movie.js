import React, { Component } from "react";
// import { movies } from "./getMovieData";
import axios from 'axios';

class Movie extends Component {
  constructor() {
    super();
    this.state = { hover: "",movies:[] };
  }
  async componentDidMount(){
    // https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a3ata1c9&language=en-US&page=${newPage}
    const response=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=3')
    const data=response.data;
    this.setState({movies:[...data.results]});
  }
  render() {
    let data = this.state.movies;

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
