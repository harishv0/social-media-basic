import { Routes, Route, useNavigate} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import Nav from "./Nav";
import Missing from "./Missing";
import Footer from "./Footer";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
// import Post from "./Post";
import { useEffect, useState } from "react";
// import Feed from "./Feed";
import {format} from "date-fns";
import api from "./api/posts";

function App() {
  const [posts, setPosts] = useState([])
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState(''); 
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data);
      console.log(response.data);
    }
    catch (err) {
      if(err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers); 
      }
      else {
      console.log(`Error: ${err.message}`);
      }
    }  
  }

  useEffect(() => {
    fetchPosts();
  }, []);
 


useEffect(() => {
  const filteredResults = Array.isArray(posts) ? posts.filter(post =>
    ((post?.body)?.toLowerCase()).includes(search?.toLowerCase()) ||
    ((post?.title)?.toLowerCase()).includes(search?.toLowerCase())
  ) : [];
  
  setPosts(filteredResults.reverse());
  }, [posts,search]);   

  const handleSubmit = (e)=> {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = {id, title:postTitle, datetime, body:postBody};
    const allPosts = [...posts, newPost];
    setSearchResults(allPosts);
    console.log(allPosts)
    setPostTitle('');
    setPostBody('');
    navigate("/")
  
  }
  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    navigate('/')

  }
  return (
    <div>
      {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/newpost">NewPost</Link></li>
          <li><Link to="/postpage">PostPage</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/newpost" element={<NewPost/>}/>
        <Route path="/postpage" element={<PostPage/>}/>
        <Route path="/postpage/:id" element={<Post/>}/>
        <Route path="*" element={<Missing/>}/>
      </Routes>
       */}
       
      <Header title="Social Media"/>
      <Nav
        search={search}
        setSearch={setSearch}
      />

      <Routes>
        <Route path="/" element={<Home posts = {searchResults}/>}/>
        <Route path="post" >
          <Route index element = {<NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}/>} />
          <Route path=":id" element = {<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="about" element={<About/>}/>
        <Route path="*" element={<Missing/>}/>
    </Routes>
    <Footer/>

    </div>
  )
}

export default App
