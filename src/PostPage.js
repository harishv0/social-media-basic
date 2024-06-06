import React from 'react';
import {Link, useParams} from 'react-router-dom';

const PostPage = ({posts,handleDelete}) => {
  const {id} = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>}
        {!post &&
          <>
              <h2>Post Not Found</h2>
              <p>Well, that's disappointing</p>
              <p>
                <Link to='/'> Visit Our HomePage</Link>
              </p>
          </>

        }
      </article>
      {/* <h1>PostPage</h1>
      <Link to="/postpage/1">Post 1</Link>
      <br />
      <Link to="/postpage/2">Post 2</Link>
      <br /> 
      <Link to="/postpage/3">Post 3</Link>
       */}
    </main>
  )
}

export default PostPage
