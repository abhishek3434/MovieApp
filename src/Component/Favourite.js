import React, { Component } from "react";
import { movies } from "./getMovieData";

class Favourite extends Component {
  constructor() {
    super();
    this.state = {filteredMovie: []};  
  }
  componentDidMount(){
    this.setState({
      filteredMovie:[...movies.results]
    })
  }

  searchMovie = (e) => {
    let newArr=[];
    let word=e.target.value.toLowerCase().trim();

    if(word===''){
      this.setState({
        filteredMovie:[...movies.results]
      })
      return;
    }

    for(let i=0;i<this.state.filteredMovie.length;i++){
      if((this.state.filteredMovie[i].title.toLowerCase().trim()).startsWith(word)){
        newArr.push(this.state.filteredMovie[i])
      }
    }
    this.setState({filteredMovie:newArr});
    console.log(newArr);
  };

  render() {
    let genereId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    return (
      <div>
        <div className="main">
          <div className="row fav-genere">
            <div className="col-3">
              <ul className="list-group ">
                <li className="list-group-item active">Action</li>
                <li className="list-group-item">Comdey</li>
                <li className="list-group-item">Adventure</li>
              </ul>
            </div>

            <div className="col-9">
              <div className="row">
                <div className="col-6">
                  <input
                    type="text"
                    onKeyUp={this.searchMovie}
                    className="input-group-text"
                  ></input>
                </div>
                <div className="col-6">
                  <input type="number" className="input-group-text"></input>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Title</th>
                        <th scope="col">Genere</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Rating</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.filteredMovie.map((movieObj) => (
                        <tr key={movieObj.id}>
                          <th>
                            <img
                              className="card-img-top"
                              src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                              alt={movieObj.title}
                              style={{ width: "6rem" }}
                            />
                          </th>
                          <th>{movieObj.original_title}</th>
                          <td>{genereId[movieObj.genre_ids[0]]}</td>
                          <td>{movieObj.popularity}</td>
                          <td>{movieObj.vote_average}</td>
                          <td>
                            <button type="button" className="btn btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Favourite;
