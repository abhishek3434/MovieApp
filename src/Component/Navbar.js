import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navbar extends Component {
    render() {
        return (
            <div>
                <div style={{display:"flex",justifyContent:'space-evenly',alignItems:'center',backgroundColor:"#2980b9",color:"whitesmoke"}}>
                    <h1><Link to='/'>Movie App</Link></h1>
                    
                    <h2> <Link to='/fav'>Favourite</Link></h2>
                </div>
            </div>
        );
    }
}

export default Navbar;