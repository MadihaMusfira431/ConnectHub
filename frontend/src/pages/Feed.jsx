import { FaUserCircle } from "react-icons/fa";
import "./Feed.css";
import { useEffect, useState } from "react";
import { FaHeart, FaComment, FaPlus } from "react-icons/fa";
import API from "../services/api";

function Feed() {
  const [posts, setPosts] = useState([]);

  const [postData, setPostData] = useState({
    text: "",
    image: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    try {
      await API.post("/posts/create", {
        username: user.username,
        text: postData.text,
        image: postData.image,
      });

      setPostData({
        text: "",
        image: "",
      });

      fetchPosts();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="feed-page">
      <div className="feed-header">
  <div>
    <h1>ConnectHub</h1>
    <p>Welcome, {user.username} 👋</p>
  </div>
</div>
<input
  type="text"
  placeholder="🔍 Search posts..."
  className="search-bar"
/>
      {/* Create Post Card */}

      <div className="create-post-card">
        <h3>Create Post</h3>

        <textarea
          placeholder="What's on your mind?"
          value={postData.text}
          onChange={(e) =>
            setPostData({
              ...postData,
              text: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Image URL (optional)"
          value={postData.image}
          onChange={(e) =>
            setPostData({
              ...postData,
              image: e.target.value,
            })
          }
        />

<button className="post-btn" onClick={createPost}>
  Create Post
</button>
      
      </div>

      {/* Posts */}
      {posts.map((post) => (
        
        <div className="post-card" key={post._id}>
<div className="post-header">
  <FaUserCircle className="default-avatar" />
  <h4>{post.username}</h4>
</div>
          <p>{post.text}</p>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="post-image"
            />
          )}

          <div className="actions">
           <div className="actions">
 <button
  onClick={async () => {
    try {
      await API.put(`/posts/like/${post._id}`, {
        username: user.username,
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }}
>
  ❤️ {post.likes.length}
</button>
  <button>
    💬 {post.comments.length}
  </button>
  
</div>
          </div>
          <input
  type="text"
  placeholder="Write a comment..."
  onKeyDown={async (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      try {
        await API.put(`/posts/comment/${post._id}`, {
          username: user.username,
          text: e.target.value,
        });

        e.target.value = "";
        fetchPosts();
      } catch (error) {
        console.log(error);
      }
    }
  }}
/>
<div className="comments-section">
  {post.comments.map((comment, index) => (
    <div key={index} className="comment">
      <strong>{comment.username}</strong>: {comment.text}
    </div>
  ))}
</div>

{user.username === post.username && (
  <button
    onClick={async () => {
      const confirmDelete = window.confirm(
        "Delete this post?"
      );

      if (!confirmDelete) return;

      await API.delete(`/posts/${post._id}`);

      fetchPosts();
    }}
  >
    Delete Post
  </button>
)}
        </div>
      ))}

      <button className="floating-btn">
        <FaPlus />
      </button>
    </div>
  );
}

export default Feed;