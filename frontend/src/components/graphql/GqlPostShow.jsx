import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPost, deletePost } from "../../api/graphql";

export default function GqlPostShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then(setPost);
  }, [id]);

  async function handleDelete() {
    if (window.confirm("Are you sure?")) {
      await deletePost(id);
      navigate("/graphql/posts");
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        Posted on{" "}
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="border border-gray-300 rounded px-5 py-4">
        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link
          to={`/graphql/posts/${post.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>

      <Link
        to="/graphql/posts"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        Back to Posts
      </Link>
    </>
  );
}
