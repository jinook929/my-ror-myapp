import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, createPost, updatePost } from "../api/posts";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchPost(id).then((post) => {
        setTitle(post.title);
        setContent(post.content);
      });
    }
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(null);

    try {
      if (isEdit) {
        await updatePost(id, { title, content });
        navigate(`/posts/${id}`);
      } else {
        const post = await createPost({ title, content });
        navigate(`/posts/${post.id}`);
      }
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Edit Post" : "New Post"}
      </h1>

      {errors && (
        <div className="bg-red-50 border border-red-300 text-red-700 rounded px-4 py-3 mb-4">
          <ul>
            {Object.entries(errors).map(([field, messages]) => (
              <li key={field}>{field} {messages.join(", ")}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 cursor-pointer"
        >
          {isEdit ? "Update Post" : "Add Post"}
        </button>
      </form>

      <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
        Back to Posts
      </Link>
    </>
  );
}
