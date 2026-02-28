import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api/posts";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Posts List</h1>

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="block border border-gray-300 rounded px-4 py-3 hover:bg-gray-50"
          >
            <p className="text-lg font-medium">{post.title}</p>
          </Link>
        ))}
      </div>

      <Link
        to="/posts/new"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mt-6"
      >
        Add New Post
      </Link>
    </>
  );
}
