import './App.css';
import Header from './components/Header';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import AddBlog from './components/AddBlog';
import BlogDetail from './components/BlogDetail';
import UpdateBlog from './components/UpdateBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from './store';
import ChatbotPage from './components/ChatBotPage';
import HomePage from './components/Homepage';
import GameScreen from './components/Game';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem('userId')) {
      dispatch(authAction.login());
    }
  },[dispatch])
  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        {!isLoggedIn ? <Route path="/auth" element={<Auth/>} /> :
        <>
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/blogs/add" element={<AddBlog/>} />
        <Route path="/myBlogs" element={<UserBlogs/>} />
        <Route path="/myBlogs/:id" element={<BlogDetail/>} />
        <Route path="/updateblog/:id" element={<UpdateBlog/>} />
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/game" element={<GameScreen/>} />



</>

}
      </Routes>
    </main>
  </React.Fragment>
}
export default App;
