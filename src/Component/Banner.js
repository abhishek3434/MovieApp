import React, { Component } from "react";
import { movies } from "./getMovieData";

class Banner extends Component {
  constructor(){
    super();
    this.state={banner:0};
  }
  render() {
    let id=this.state.banner%movies['results'].length;
    let data = movies['results'][id];
  
    setTimeout(()=>{this.setState({banner:id+1})},9000)
   
    return data === "" ? (
      <>
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      </>
    ) : (
      <div>
        <div className="card banner-card" >
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}  alt={data.title} />
          <div className="card-body banner-card-body">
            <h5 className="card-title banner-title">{data.title}</h5>
            <p className="card-text banner-text">
             {data.overview}
            </p>
           
          </div>
        </div>
      </div>

    );
  }
}

export default Banner;
