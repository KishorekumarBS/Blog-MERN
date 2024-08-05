import Header from '../Header/Header';
import Layout from '../Layout/Layout';
import CreatePost from '../Pages/CreatePost/CreatePost';
import IndexPage from '../Pages/IndexPage/IndexPage';
import Login from '../Pages/Login/Login';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import Post from '../Post/Post';
import { UserContextProvider } from '../UserContext/UserContext';
import './App.css';
import {Route, Routes} from "react-router-dom";

function App() {
  return (
    <UserContextProvider>
       <Routes>
      <Route path="/" element ={<Layout/>}>
            <Route index element ={<IndexPage/>}/>
            <Route path={'/login'} element ={<Login/>}/>
            <Route path = {'/register'} element ={<RegisterPage/>}/>
            <Route path='/create' element={<CreatePost/>}/>
    </Route>
    </Routes>
    </UserContextProvider>
   
    
  );
}

export default App;
