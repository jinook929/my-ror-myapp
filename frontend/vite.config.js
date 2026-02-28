import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/graphql": {
        target: "http://localhost:3000",
        changeOrigin: true,
        bypass(req) {
          // Only proxy exact /graphql path to Rails, let /graphql/posts/* be handled by React Router
          if (req.url !== "/graphql") {
            return req.url;
          }
        },
      },
    },
  },
});
