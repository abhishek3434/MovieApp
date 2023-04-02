import './App.css';  
import { Route, Routes} from 'react-router-dom'  
import Navbar from './Component/Navbar';
import Banner from './Component/Banner';
import Movie from './Component/Movie';
import Favourite from './Component/Favourite';

function App() {
  return (
    <div>

      <Navbar/>
      <Routes>
        <Route path='/' Component={()=> <><Banner/><Movie/></>} />
        <Route path='/fav' Component={Favourite} />
      </Routes>

     
    </div>
  );
}

export default App;
