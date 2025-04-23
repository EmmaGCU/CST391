import React, { useState } from 'react';
import Post from './Post';
import AddPost from './AddPost';

function App() {
  const [postList, setPostList] = useState([
    {
      postNumber: 0,
      text: 'A very interesting blog post about nothing.'
    },
    {
      postNumber: 1,
      text: 'More interesting reading if only I had more time...'
    },
    {
      postNumber: 2,
      text: 'Third blog post. I have run out of ideas. Please comment below.'
    }
  ]);

  const [postId, setPostId] = useState(3);

  const handleAddPost = (newText) => {
    let newPost = {
      postNumber: postId,
      text: newText
    };
    setPostList(postList => [...postList, newPost]);
    setPostId(postId+1);
  }
  
  const handleDeletePost = (id) => {
    let updatedPostList = postList.filter(post => post.postNumber !== id);

    setPostList(updatedPostList);
  }

  const posts = postList.map((post) => (
    <Post key={post.postNumber} text={post.text} id={post.postNumber} onDelete={handleDeletePost}/>
  ));

  return (
    <div>
      {posts}
      <AddPost onAdd={handleAddPost} />
    </div>
  );
}

export default App;
