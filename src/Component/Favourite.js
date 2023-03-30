import React, { Component } from "react";

class Favourite extends Component {
  render() {
    return (
      <div>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group fav-genere">
                <li className="list-group-item active">Action</li>
                <li className="list-group-item">Comdey</li>
                <li className="list-group-item">Adventure</li>
              </ul>
            </div>

            <div className="col-9">
                <div className="row">
                    <input></input>
                    <input></input>
                </div>
                
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Favourite;
