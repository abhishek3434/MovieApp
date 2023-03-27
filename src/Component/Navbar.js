import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <div style={{display:"flex",justifyContent:'space-evenly',alignItems:'center',backgroundColor:"#2980b9",color:"whitesmoke"}}>
                    <h1>Movie App</h1>
                    <h2>Favourite</h2>
                </div>
            </div>
        );
    }
}

export default Navbar;