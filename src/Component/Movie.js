import React, { Component } from "react";
// import { movies } from "./getMovieData";

import axios from "axios";

class Movie extends Component {
  constructor() {
    super();
    this.state = { hover: "", movies: [],parr:[1],currentPage:1};
  }
  async componentDidMount() {
    // https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a3ata1c9&language=en-US&page=${newPage}
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currentPage}`
    );
    const data = response.data;
    this.setState({ movies: [...data.results] });
  }

  async renderPage(){
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currentPage}`
    );
    const data = response.data;
    this.setState({ movies: [...data.results] });
  }

  handleNext=()=>{
    let newArr=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
      newArr.push(i);
    }
    this.setState({parr:[...newArr],currentPage:this.state.currentPage+1},this.renderPage);
  }

  handlePrev=()=>{
    if(this.state.parr.length<2) return;
    let newArr=[];
    for(let i=1;i<this.state.parr.length;i++){
      newArr.push(i);
    }
    this.setState({parr:[...newArr],currentPage:this.state.currentPage-1},this.renderPage);
  }

  handleCurr=(id)=>{
    if(this.state.currentPage === id) return;
    this.setState({currentPage:id},this.renderPage);
  }

  addMovie=(movie)=>{
    if (localStorage.getItem("keys")) {
      let arr = localStorage.getItem("keys");
      arr = JSON.parse(arr);
      if(arr.includes(movie.id)) return;
      arr.push(movie.id);
      localStorage.setItem("keys", JSON.stringify(arr));
      localStorage.setItem(movie.id,JSON.stringify(movie))
    }
    else{
      let arr=[movie.id];
      localStorage.setItem("keys", JSON.stringify(arr));
      localStorage.setItem(movie.id,JSON.stringify(movie))
    }
  }
  delete=(id)=>{
    let newArr=[];
    let arr = localStorage.getItem("keys");
    localStorage.removeItem(id)
    arr = JSON.parse(arr);
    
    arr=arr.filter((loc)=>{
 
      return loc!==id;
    })
    localStorage.setItem("keys",JSON.stringify(arr));
  }
  


  render() {
    let data = this.state.movies;
 

    return data.length === 0 ? (
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
              onMouseEnter={() => this.setState({ hover: movieObj.id })}
              onMouseLeave={() => this.setState({ hover: "" })}
              
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
                {this.state.hover === movieObj.id  ? (!localStorage.getItem(movieObj.id)? (
                  <button onClick={()=>this.addMovie(movieObj)} className="btn btn-primary movie-button">
                    
                    Add to favourite
                    
                  </button>
                ):( <button onClick={()=>this.delete(movieObj.id)}  className="btn btn-danger movie-button">
                    
                Remove from favourite
                
              </button>)) : (
                 ''
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="div-pagination">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" onClick={this.handlePrev} href="#/">
                  Previous
                </a>
                </li>
           {
            this.state.parr.map((value)=>(
              <div key={value}> 
              <li className="page-item">
                <a className="page-link" onClick={()=>this.handleCurr(value)}  href="#/">
                  {value}
                </a>
              </li>
              </div>
            ))
           }
              <li className="page-item">
                <a className="page-link" onClick={this.handleNext} href="#/">
                  Next
                </a>
              </li>
            </ul>

          </nav>
        </div>

      </div>
    );
  }
}

export default Movie;
