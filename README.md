# MyApp

A full-stack blog application with a **Rails 8 API backend** (REST + GraphQL) and a **React (Vite) frontend**.

## Tech Stack

### Backend
- Ruby 3.4
- Rails 8.1
- SQLite3
- Puma
- GraphQL (graphql-ruby)
- Tailwind CSS (for server-rendered views)

### Frontend
- React 19
- React Router 7
- Vite 7
- Tailwind CSS 4

## Project Structure

```
myapp/
├── app/                      # Rails application
│   ├── controllers/
│   │   ├── posts_controller.rb          # HTML views (server-rendered)
│   │   ├── api/v1/posts_controller.rb   # REST API for React frontend
│   │   └── graphql_controller.rb        # GraphQL endpoint
│   ├── graphql/
│   │   ├── types/post_type.rb           # Post GraphQL type
│   │   ├── types/query_type.rb          # Queries (posts, post)
│   │   └── mutations/                   # Create, Update, Delete mutations
│   ├── models/
│   └── views/
├── frontend/                 # React SPA (Vite)
│   └── src/
│       ├── App.jsx
│       ├── api/
│       │   ├── posts.js                 # REST API client
│       │   └── graphql.js               # GraphQL API client (fetch)
│       └── components/
│           ├── PostList.jsx             # REST components
│           ├── PostShow.jsx
│           ├── PostForm.jsx
│           └── graphql/                 # GraphQL components
│               ├── GqlPostList.jsx
│               ├── GqlPostShow.jsx
│               └── GqlPostForm.jsx
├── config/
│   ├── routes.rb
│   └── initializers/cors.rb
└── Procfile.dev
```

## Getting Started

### Prerequisites

- Ruby 3.4+
- Node.js 22+
- SQLite3

### Setup

```bash
# Install Ruby dependencies
bundle install

# Setup database
bin/rails db:setup

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Running the App

Start all services (Rails server, Tailwind CSS watcher, Vite dev server) with:

```bash
bin/dev
```

This runs via `Procfile.dev`:
- **Rails** → `http://localhost:3000`
- **Vite (React)** → `http://localhost:5173`

The Vite dev server proxies `/api` and `/graphql` requests to the Rails server.

## API Endpoints

### REST

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/posts` | List all posts |
| GET | `/api/v1/posts/:id` | Show a post |
| POST | `/api/v1/posts` | Create a post |
| PATCH | `/api/v1/posts/:id` | Update a post |
| DELETE | `/api/v1/posts/:id` | Delete a post |

### GraphQL

Single endpoint: `POST /graphql`

**Queries:**
- `posts` — List all posts
- `post(id:)` — Get a single post

**Mutations:**
- `createPost(input: { title, content })` — Create a post
- `updatePost(input: { id, title, content })` — Update a post
- `deletePost(input: { id })` — Delete a post

GraphiQL IDE is available at `http://localhost:3000/graphiql` in development.

## Frontend Routes

### REST

| Path | Component | Description |
|------|-----------|-------------|
| `/` | PostList | List all posts |
| `/posts/new` | PostForm | Create a new post |
| `/posts/:id` | PostShow | View a post |
| `/posts/:id/edit` | PostForm | Edit a post |

### GraphQL

| Path | Component | Description |
|------|-----------|-------------|
| `/graphql/posts` | GqlPostList | List all posts |
| `/graphql/posts/new` | GqlPostForm | Create a new post |
| `/graphql/posts/:id` | GqlPostShow | View a post |
| `/graphql/posts/:id/edit` | GqlPostForm | Edit a post |

## Server-Rendered Routes

Rails also serves HTML views at `/posts` via `PostsController` with full CRUD support.
