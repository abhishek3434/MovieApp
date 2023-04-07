import React, { Component } from "react";
import { genereId, getLocal as localD } from "./getMovieData";

class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      filteredMovie: [],
      genere: "All",
      currPage: 1,
      parr: [1],
      currRecord: 5,
    };
  }
  componentDidMount() {
    this.setState({
      filteredMovie: [...localD()],
    });
  }

  searchMovie = (e) => {
    let newArr = [];
    let word = e.target.value.toLowerCase().trim();

    if (word === "") {
      this.changeGenere(this.state.genere);
      return;
    }
    for (let i = 0; i < this.state.filteredMovie.length; i++) {
      if (
        this.state.filteredMovie[i].title.toLowerCase().trim().startsWith(word)
      ) {
        newArr.push(this.state.filteredMovie[i]);
      }
    }
    this.setState({ filteredMovie: [...newArr] });
  };

  changeGenere = (type) => {
    let val = type;
    let newArr = [];
    if (val === "All") {
      this.setState({
        filteredMovie: [...localD()],
        genere: "All",
      });
      return;
    }

    for (let i = 0; i < localD().length; i++) {
      if (genereId[localD()[i].genre_ids[0]] === val) {
        newArr.push(localD()[i]);
      }
    }
   
    this.setState({ filteredMovie: [...newArr], genere: val });
  };

  delete = (id) => {
    let newArr = [];
    let arr = localStorage.getItem("keys");
    localStorage.removeItem(id);
    arr = JSON.parse(arr);

    arr = arr.filter((loc) => {
      return loc !== id;
    });

    newArr = this.state.filteredMovie.filter((movieObj) => {
      return movieObj.id !== id;
    });
    localStorage.setItem("keys", JSON.stringify(arr));
    this.setState({ filteredMovie: [...newArr] });
  };

  sortTitle = (elem) => {
    let newArr = [...this.state.filteredMovie];
    let sorted = newArr.sort((a, b) => (a[elem] > b[elem] ? 1 : -1));
    this.setState({ filteredMovie: [...sorted] });
  };
  handlePage=(e)=>{

    let elem=e.nativeEvent.data
    if(elem===null || elem === 0 || elem===undefined)elem=3;
    console.log(this.state.currRecord)
    this.setState({currRecord:elem})
  }

  handleCurr=(value)=>{
    this.setState({currPage:value})
  }

  render() {
    let temp = [];
  

    localD().forEach((movieObj) => {
      if (!temp.includes(genereId[movieObj.genre_ids[0]])) {
        temp.push(genereId[movieObj.genre_ids[0]]);
      }
    });


    let arr=[1];
    let elem=this.state.currRecord;
    let lt=this.state.filteredMovie.length;
    let cal=(lt/elem);
    if(lt%elem){
      cal+=1;
    }

    for(let i=2;i<=cal;i++){
      arr.push(i);
    }



    let start=(this.state.currPage-1)*this.state.currRecord;
    let end=(this.state.currPage)*Math.min(this.state.currRecord,this.state.filteredMovie.length);

    let finalMovie=this.state.filteredMovie.slice(start,end);



    return (
      <div>
        <div className="main">
          <div className="row fav-genere">
            <div className="col-3">
              <ul className="list-group ">
                <li
                  className={
                    this.state.genere === "All"
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  onClick={() => this.changeGenere("All")}
                >
                  All Genere
                </li>
                {temp.map((obj) => (
                  <li
                    className={
                      this.state.genere === obj
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                    onClick={() => this.changeGenere(obj)}
                    key={obj}
                  >
                    {obj}
                  </li>
                ))}
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
                  <input type="number" className="input-group-text" onChange={this.handlePage}  >
                  </input>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" onClick={() => this.sortTitle("title")}>
                          Title
                        </th>
                        <th scope="col" onClick={() => this.sortTitle("title")}>
                          Genere
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.sortTitle("popularity")}
                        >
                          Popularity
                        </th>
                        <th
                          scope="col"
                          onClick={() => this.sortTitle("vote_average")}
                        >
                          Rating
                        </th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalMovie.map((movieObj) => (
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
                            <button
                              type="button"
                              onClick={() => this.delete(movieObj.id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="div-pagination">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        {arr.map((value) => (
                          <div key={value}>
                            <li className="page-item">
                              <a
                                className="page-link"
                                onClick={() => this.handleCurr(value)}
                                href="#/"
                              >
                                {value}
                              </a>
                            </li>
                          </div>
                        ))}
                      </ul>
                    </nav>
                  </div>
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
