import Layout from '../Layout/Layout';
import CreatePost from '../Pages/CreatePost/CreatePost';
import IndexPage from '../Pages/IndexPage/IndexPage';
import Login from '../Pages/Login/Login';
import PostPage from '../Pages/PostPage/PostPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import EditPost from '../Pages/EditPost/EditPost'
import { UserContextProvider } from '../UserContext/UserContext';
import './App.css';
import {Route, Routes} from "react-router-dom";
// streak
function App() {
  return (
    <UserContextProvider>
       <Routes>
      <Route path="/" element ={<Layout/>}>
            <Route index element ={<IndexPage/>}/>
            <Route path={'/login'} element ={<Login/>}/>
            <Route path = {'/register'} element ={<RegisterPage/>}/>
            <Route path='/create' element={<CreatePost/>}/>
            <Route path = {'/post/:id'} element = {<PostPage/>}/>
            <Route path = {'/edit/:id'} element = {<EditPost/>}/>
    </Route>
    </Routes>
    </UserContextProvider>
   
    
  );
}

export default App;
