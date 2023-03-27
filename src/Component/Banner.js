import React, { Component } from "react";
import { movies } from "./getMovieData";

class Banner extends Component {
  render() {
    let data = movies;
    console.log(data);
   
    return data === "" ? (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </>
    ) : (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src="https://picsum.photos/200/300" style={{width:"100%"}} alt="Card cap" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
