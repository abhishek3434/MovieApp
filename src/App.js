import './App.css';

import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import Movie from './Component/Movie';
import Favourite from './Component/Favourite';

function App() {
  return (
    <div>
      <Navbar/>
      {/* <Banner/> */}
      {/* <Movie/> */}
      <Favourite/>
    </div>
  );
}

export default App;
