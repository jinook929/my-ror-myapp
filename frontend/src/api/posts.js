const BASE = "/api/v1/posts";

export async function fetchPosts() {
  const res = await fetch(BASE);
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
}

export async function createPost(post) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw data.errors;
  }
  return res.json();
}

export async function updatePost(id, post) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw data.errors;
  }
  return res.json();
}

export async function deletePost(id) {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });
}
