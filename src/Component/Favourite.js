import React, { Component } from "react";
import {genereId,getLocal as localD } from "./getMovieData";

class Favourite extends Component {
  constructor() {
    super();
    this.state = {filteredMovie: [],genere:'All'};  
  }
  componentDidMount(){
    this.setState({
      // filteredMovie:[...movies.results]
      filteredMovie:[...localD()]
    })
  }

  searchMovie = (e) => {
    let newArr=[];
    let word=e.target.value.toLowerCase().trim();

    if(word===''){
      this.changeGenere(this.state.genere);
      return;
    }
    for(let i=0;i<this.state.filteredMovie.length;i++){
      if((this.state.filteredMovie[i].title.toLowerCase().trim()).startsWith(word)){
        newArr.push(this.state.filteredMovie[i])
      }
    }
    this.setState({filteredMovie:[...newArr]});
  };



  changeGenere=(type)=>{
    let val=type;
    let newArr=[];
    if(val === "All"){
      this.setState({
        // filteredMovie:[...movies.results],
        filteredMovie:[...localD()],
        genere:"All"
      })
      return;
    }

    for(let i=0;i<localD().length;i++){
      if((genereId[localD()[i].genre_ids[0]]) === val){
        newArr.push(localD()[i])
      }
    }
    this.setState({filteredMovie:[...newArr],genere:val});
  }

  delete=(id)=>{
    let newArr=[];
    
    newArr=this.state.filteredMovie.filter((movieObj)=>{
      return (movieObj.id !== id)
    });
    
    this.setState({filteredMovie:[...newArr]});
  }

  render() {
    
    let temp=[];
    // movies.results.forEach((movieObj)=>{
    //   if(!temp.includes(genereId[movieObj.genre_ids[0]])){
    //     temp.push(genereId[movieObj.genre_ids[0]]);
    //   }
    // })

    this.state.filteredMovie.forEach((movieObj)=>{
      if(!temp.includes(genereId[movieObj.genre_ids[0]])){
        temp.push(genereId[movieObj.genre_ids[0]]);
      }
    })

    return (
      <div>
        <div className="main">
          <div className="row fav-genere">
            <div className="col-3">
              <ul className="list-group ">
                <li className={this.state.genere==="All"?"list-group-item active":"list-group-item" } onClick={()=>this.changeGenere("All")} >All Genere</li>
                {
                  temp.map((obj)=>(
                <li className={this.state.genere===obj?"list-group-item active":"list-group-item" } onClick={()=>this.changeGenere(obj)} key={obj}>{obj}</li>
                  ))
                }
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
                            <button type="button" onClick={()=>this.delete(movieObj.id)} className="btn btn-danger">
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
