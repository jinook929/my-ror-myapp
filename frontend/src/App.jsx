import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostShow from "./components/PostShow";
import PostForm from "./components/PostForm";

function App() {
  return (
    <BrowserRouter>
      <main className="max-w-2xl mx-auto px-5 py-10">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostShow />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
