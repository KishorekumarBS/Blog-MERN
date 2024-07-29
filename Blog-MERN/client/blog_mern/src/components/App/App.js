import Header from '../Header/Header';
import Post from '../Post/Post';
import './App.css';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element ={<main>
      <Header/>
      <Post/>
      <Post/>
      <Post/>
    </main>}/>
    </Routes>
    
  );
}

export default App;
