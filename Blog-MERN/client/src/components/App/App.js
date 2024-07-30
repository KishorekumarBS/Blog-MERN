import Header from '../Header/Header';
import Layout from '../Layout/Layout';
import IndexPage from '../Pages/IndexPage/IndexPage';
import Login from '../Pages/Login/Login';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import Post from '../Post/Post';
import './App.css';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Layout/>}>
            <Route index element ={<IndexPage/>}/>
            <Route path={'/login'} element ={<Login/>}/>
            <Route path = {'/register'} element ={<RegisterPage/>}/>
    </Route>
    </Routes>
    
  );
}

export default App;
