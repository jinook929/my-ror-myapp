const GRAPHQL_URL = "/graphql";

async function graphqlRequest(query, variables = {}) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw json.errors;
  }
  return json.data;
}

export async function fetchPosts() {
  const data = await graphqlRequest(`
    query {
      posts {
        id
        title
        content
        createdAt
        updatedAt
      }
    }
  `);
  return data.posts;
}

export async function fetchPost(id) {
  const data = await graphqlRequest(
    `
    query GetPost($id: ID!) {
      post(id: $id) {
        id
        title
        content
        createdAt
        updatedAt
      }
    }
    `,
    { id }
  );
  return data.post;
}

export async function createPost(post) {
  const data = await graphqlRequest(
    `
    mutation CreatePost($title: String!, $content: String!) {
      createPost(input: { title: $title, content: $content }) {
        post {
          id
          title
          content
          createdAt
          updatedAt
        }
        errors
      }
    }
    `,
    { title: post.title, content: post.content }
  );
  if (data.createPost.errors.length > 0) {
    throw data.createPost.errors;
  }
  return data.createPost.post;
}

export async function updatePost(id, post) {
  const data = await graphqlRequest(
    `
    mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
      updatePost(input: { id: $id, title: $title, content: $content }) {
        post {
          id
          title
          content
          createdAt
          updatedAt
        }
        errors
      }
    }
    `,
    { id, title: post.title, content: post.content }
  );
  if (data.updatePost.errors.length > 0) {
    throw data.updatePost.errors;
  }
  return data.updatePost.post;
}

export async function deletePost(id) {
  await graphqlRequest(
    `
    mutation DeletePost($id: ID!) {
      deletePost(input: { id: $id }) {
        id
      }
    }
    `,
    { id }
  );
}
