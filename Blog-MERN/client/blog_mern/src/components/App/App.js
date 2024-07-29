import Header from '../Header/Header';
import Layout from '../Layout/Layout';
import Post from '../Post/Post';
import './App.css';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Layout/>}>
            <Route index element ={<Post/>}/>
            <Route path={'/login'} element ={<div>login</div>}/>
    </Route>
    </Routes>
    
  );
}

export default App;
