import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostShow from "./components/PostShow";
import PostForm from "./components/PostForm";
import GqlPostList from "./components/graphql/GqlPostList";
import GqlPostShow from "./components/graphql/GqlPostShow";
import GqlPostForm from "./components/graphql/GqlPostForm";

function App() {
  return (
    <BrowserRouter>
      <main className="max-w-2xl mx-auto px-5 py-10">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostShow />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />

          {/* GraphQL routes */}
          <Route path="/graphql/posts" element={<GqlPostList />} />
          <Route path="/graphql/posts/new" element={<GqlPostForm />} />
          <Route path="/graphql/posts/:id" element={<GqlPostShow />} />
          <Route path="/graphql/posts/:id/edit" element={<GqlPostForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
