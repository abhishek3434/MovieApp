import React, { Component } from "react";
import { movies } from "./getMovieData";

class Banner extends Component {
  render() {
    let data = movies['results'][0];
    console.log(data);
   
    return data === "" ? (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </>
    ) : (
      <div>
        <div className="card" >
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}  alt={data.title} />
          <div className="card-body">
            {/* <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p> */}
           
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
